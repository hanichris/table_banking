#!/usr/bin/env python3
"""Router for handling bank operations."""
from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from fastapi.encoders import jsonable_encoder
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import user, _bank
from app.schemas import Bank, BankUsers, BankCreate

import app.models.user as mdl


reg_exp = r"^[\w!#$%&'*+\/=?`{|}~^-]+(?:\.[\w!#$%&'*+\/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$"
router = APIRouter(
    prefix='/banks',
    tags=['banks']
)

@router.get('/', response_model=list[BankUsers])
async def read_banks(
    db: Annotated[Session, Depends(deps.get_db)],
    current_user: Annotated[mdl.User, Depends(deps.get_current_active_user)],
    skip: int = 0,
    limit: int = 100
):
    """Get a list of bank instances in a paginated manner.

    The instances obtained depend on if an application admin is requesting them
    or if a user with administrative priviledges over some banks is.
    Args:
        * `db` - A session object.
        * `current_user` - The currently logged in user.
        * `skip` - The offset parameter to paginate the data with.
        * `limit` - The maximum number of instances to get per request.

    Returns:
        * A paginated list of results.
    """
    if user.is_superuser(current_user):
        banks = _bank.get_multi(db, skip=skip, limit=limit)
    else:
        banks = _bank.get_multi_by_admin(
            db, admin_id=current_user.id, skip=skip, limit=limit
        )
    return banks

@router.post('/', response_model=Bank)
async def create_bank(
    db: Annotated[Session, Depends(deps.get_db)],
    current_user: Annotated[mdl.User, Depends(deps.get_current_active_user)],
    bank_in: BankCreate
):
    """Create a new table bank with an associated admin for it.

    Args:
        * `db` - A session object.
        * `current_user` - The currently logged in user who will be the admin
        for this bank being created.
        * `bank_in` - The details for the newly created bank.

    Returns:
        * The newly created bank instance.
    """
    return _bank.create_with_owner(db, admin_id=current_user.id, obj_in=bank_in)

@router.patch('/{bank_id}/users/{user_id}', response_model=BankUsers)
async def add_or_remove_bank_member(
    db: Annotated[Session, Depends(deps.get_db)],
    bank_id: int,
    user_id: int,
    current_user: Annotated[mdl.User, Depends(deps.get_current_active_user)],
    r: Annotated[
        bool,
        Query(title='Flag to add or remove a bank member.',
              description="""By default, adds a new member when `r=0`/`r=False`.
              Otherwise, removes the member when `r=1` or `r=True`."""
        )] = False
):
    """Add or remove a member from the given bank.

    Args:
        * `db` - A session object.
        * `bank_id` - The id of the bank to add or remove members from.
        * `user_id` - The id of the user to add or remove from the bank.
        * `current_user` - The currently logged in user.
        * `r` - Query flag denoting whether to add or remove the user.

    Returns:
        * The changes to the membership of the bank.
    """
    member = user.get(db, id=user_id)
    if not member:
        raise HTTPException(
            status_code=404,
            detail='The provided user details were not found.'
        )

    if member.id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail='Bank admin is already a bank member.'
        )

    stored_bank = _bank.get(db, id=bank_id)
    if not stored_bank:
        raise HTTPException(
            status_code=404,
            detail='Bank not found.'
        )
    if stored_bank.admin_id != current_user.id:
        raise HTTPException(
            status_code=400,
            detail="The user is not the admin for this bank."
        )

    member_count = len(
        tuple(filter(lambda x: x.id == member.id, stored_bank.members))
        )
    if not r and member_count:
        raise HTTPException(
            status_code=400,
            detail='The user is already a member of this bank.'
        )
    elif r and member_count == 0:
        raise HTTPException(
            status_code=400,
            detail='The user is not a member of this bank.'
        )

    if r:
        return _bank.remove_bank_member(
            db, bank_model=stored_bank, user_model=member
            )
    return _bank.add_bank_member(db, bank_model=stored_bank, user_model=member)
