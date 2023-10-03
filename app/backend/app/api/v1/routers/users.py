#!/usr/bin/env python3
"""Router dedicated to handling users."""
from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.api import deps
from app.core.settings_config import settings
from app.core.security import verify_password
from app.crud import user
from app.schemas import User, UserBanks, UserCreate, UserUpdate

import app.models.user as mdl


router = APIRouter(
    prefix='/users',
    tags=['users'],
    responses={
        404: {'description': 'Not Found'},
        401: {'description': 'Unauthorized'},
        403: {'description': 'Prohibited'},
        400: {'description': 'Bad Request'}}
)

@router.get('/',
            dependencies=[Depends(deps.get_current_active_superuser)],
            response_model=list[UserBanks])
async def read_users(
    db: Annotated[Session, Depends(deps.get_db)],
    skip: int = 0,
    limit: int = 100,
):
    """Obtain a list of users in a paginated manner.
 
    Args:
        * `db` - A SQLAlchemy session object.
        * `skip` - The value offset from the start of the list.
        * `limit` - The maximum number of users to get in 1 request.

    Returns:
        * A list of users.
    """
    return user.get_multi(db, skip=skip, limit=limit) 


@router.post('/',
             dependencies=[Depends(deps.get_current_active_superuser)],
             response_model=User,
             status_code=201
)
async def create_user(
    db: Annotated[Session, Depends(deps.get_db)],
    user_in: UserCreate
):
    """Create a new user for the application.

    Requires administrative priviledges to facilitate this operation.
    Args:
        * `db` - A SQLAlchemy session object.
        * `user_in` - A request body parameter containing the details
        pertaining to a new user.

    Raises:
        * `HTTPException` - If the provided email is already taken.

    Returns:
        * `User` - The newly created user.
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
    user_email: Annotated[EmailStr | None, Body()] = None,
    user_full_name: Annotated[str | None, Body()] = None,
    user_pwd: Annotated[str | None, Body()] = None
):
    """A user can update their own details.

    Args:
        * `db` - A SQLAlchemy session object.
        * `stored_user` - The details of the currently logged in user.
        * `user_email` - The new email for the logged in user.
        * `user_full_name` - The new full name for the logged in user.
        * `user_pwd` - The new password for the logged in user.

    Returns:
        * `User` - The updated details of the logged in user.
    """
    stored_user_data = jsonable_encoder(stored_user)
    user_in = UserUpdate(**stored_user_data)
    if user_email:
        user_in.email = user_email
    if user_full_name:
        user_in.full_name = user_full_name
    if user_pwd:
        user_in.password = user_pwd
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
    """Get the current user.

    Args:
        * `current_user` - The currently logged in user.

    Returns:
        * `User` - The user associated with the provided `JWT` token.
    """
    return current_user

@router.delete('/me', response_model=User, status_code=204)
async def delete_me(
    db: Annotated[Session, Depends(deps.get_db)],
    current_user: Annotated[mdl.User, Depends(deps.get_current_active_user)],
    user_pwd: Annotated[str, Body()]
):
    """Delete the current user.

    Args:
        * `db` - A SQLAlchemy session object.
        * `current_user` - The currently logged in user.
        * `user_pwd` - The password entered to confirm the deletion of the account
    
    Raises:
        * `HTTPException (400)` if the entered password was incorrect.
    
    Returns:
        * `User` the deleted user details
    """
    is_verified = verify_password(user_pwd, current_user.password)
    if not is_verified:
        raise HTTPException(
            status_code=400,
            detail='Incorrect password entered. Cannot complete operation.'
        )
    return user.remove(db, id=current_user.id)


@router.post('/open', response_model=User, status_code=201)
async def create_user_open(
    db: Annotated[Session, Depends(deps.get_db)],
    user_email: Annotated[EmailStr, Body()],
    user_pwd: Annotated[str, Body()],
    user_full_name: Annotated[str | None, Body()] = None,
):
    """Create a new user without needing to be logged in.

    Args:
        * `db` - A SQLAlchemy session object.
        * `user_email` - A request body parameter with the email for a new user.
        * `user_pwd` - A request body parameter with the password for a new user.
        * `user_full_name` - A request body parameter with the fullname of the
        new user.

    Raises:
        * `HTTPException` - if the server doesn't permit new user registration
                            without first being logged in.
                            Also, when the username provided is already taken.

    Returns:
        * `User` - The newly created user.
    """
    if not settings.USERS_OPEN_REGISTRATION:
        raise HTTPException(
            status_code=403,
            detail='Open user registration is prohibited on this server.'
        )

    new_user = user.get_by_email(db, email=user_email)
    if new_user:
        raise HTTPException(
            status_code=400,
            detail='The username is already taken.'
        )
    user_in = UserCreate(
        email=user_email,
        password=user_pwd,
        full_name=user_full_name
    )
    return user.create_user(db, obj_in=user_in)


@router.get(
        '/{user_id}',
        dependencies=[Depends(deps.get_current_active_superuser)],
        response_model=UserBanks
)
async def read_user(
    db: Annotated[Session, Depends(deps.get_db)],
    user_id: int,
):
    """Admin can get the details of the user with the specified id.

    Args:
        * `db` - A SQLAlchemy session object.
        * `user_id` - The id of the person of interest.

    Raises:
        * `HTTPException` - When the provided id doesn't match anyone.

    Returns:
        * `User` - The person of interest.
    """
    stored_user = user.get(db, id=user_id)
    if not stored_user:
        raise HTTPException(
            status_code=404,
            detail='User not found.'
        )
    return stored_user


@router.patch(
    '/{user_id}',
    dependencies=[Depends(deps.get_current_active_superuser)],
    response_model=User
)
async def update_user(
    db: Annotated[Session, Depends(deps.get_db)],
    user_id: int,
    user_in: UserUpdate
):
    """Update a user's details.

    Args:
        * `db` - A SQLAlchemy session object.
        * `user_id` - The id of the person of interest.
        * `user_in` - The request body parameter with update details for the user.

    Raises:
        * `HTTPException` - When the id provided doesn't match any individual.

    Returns:
        * `User` - With updated details.
    """
    stored_user = user.get(db, id=user_id)
    if not stored_user:
        raise HTTPException(
            status_code=404,
            detail='User not found'
        )
    return user.update_user(
        db,
        user_db_model=stored_user,
        obj_in=user_in
    )

@router.delete(
        '/{user_id}',
        dependencies=[Depends(deps.get_current_active_superuser)],
        response_model=User,
        status_code=204
)
async def delete_user(
    db: Annotated[Session, Depends(deps.get_db)],
    user_id: int,
):
    """Delete the user with the given ID.

    An admin can delete the user with the corresponding ID.
    Args:
        * `db` - A SQLAlchemy Session object.
        * `user_id` - The id of the person of interest.

    Raises:
        * HTTPException (404) if the ID did not match any user in the database.

    Returns:
        * `User` - The deleled user.
    """
    user_to_delete = user.get(db, id=user_id)
    if not user_to_delete:
        raise HTTPException(
            status_code=404,
            detail='The ID does not match any user in the database.'
        )
    return user.remove(db, id=user_id)