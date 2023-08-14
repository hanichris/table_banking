#!/usr/bin/env python3
"""Router dedicated to handling users."""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.api import deps
from app.crud import user
from app.schemas import User, UserBanks, UserCreate, UserInDB, UserUpdate

import app.models.user as mdl


router = APIRouter(
    prefix='/users',
    tags=['users'],
    responses={
        404: {'description': 'Not Found'},
        401: {'description': 'Unauthorized'},
        403: {'description': 'Prohibited'},}
)

@router.get('/',
            dependencies=[Depends(deps.get_current_active_superuser)],
            response_model=list[UserBanks])
async def read_users(
    db: Annotated[Session, Depends(deps.get_db)],
    skip: int = 0,
    limit: int = 100,
):
    return user.get_multi(db, skip=skip, limit=limit) 

@router.post('/',
             dependencies=[Depends(deps.get_current_active_superuser)],
             response_model=User)
async def create_user(
    db: Annotated[Session, Depends(deps.get_db)],
    user_in: UserCreate
):
    """Create a new user for the application.

    Requires administrative priviledges to facilitate this operation.
    """
    new_user = user.get_by_email(db, email=user_in.email)
    if new_user:
        raise HTTPException(
            status_code=400,
            detail='This username is already taken.'
        )
    new_user = user.create_user(db, obj_in=user_in)
    return new_user
    
@router.patch('/me', response_model=User)
async def update_me(
    db: Annotated[Session, Depends(deps.get_db)],
    stored_user: Annotated[mdl.User, Depends(deps.get_current_active_user)],
    user_in: UserUpdate
):
    """A user can update their own details."""
    updated_user = user.update_user(
        db,
        user_db_model=stored_user,
        obj_in=user_in
    )
    return updated_user

@router.get('/me', response_model=UserBanks)
async def read_me(
    current_user: Annotated[mdl.User, Depends(deps.get_current_active_user)]
):
    """Get the current user."""
    return current_user