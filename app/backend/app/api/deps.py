#!/usr/bin/env python3
"""Holds the dependencies that the application requires to function.

Utilises `FastAPI`'s dependency injection system.
"""
from typing import Annotated, Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.crud import user
from app.core.settings_config import settings
from app.db.db_setup import SessionLocal
from app.models import User
from app.schemas import TokenPayload


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f'{settings.API_V1_STR}/login/access-token'
)

def get_db() -> Generator:
    """Dependable that creates an independent DB session per request.

    The created session is used throughout the duration of the request
    and is closed once the request is completed. Afterwards, a new
    session is created for the next request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
        db: Annotated[Session, Depends(get_db)],
        token: Annotated[str, Depends(oauth2_scheme)]
) -> User:
    """Utilise the `Bearer` token to get a user from the database.
    
    Args:
    * `db` - Session object to interact with the DB backend.
    * `token` - Bearer token serving as a proxy for a user.

    Raises:
    * `HTTPException` - When there is an error validating the token.

    Return:
    * `User` - An instance of the SQLAlchemy `User` class.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={'WWW-Authenticate': 'Bearer'}
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise credentials_exception
    current_user = user.get(db, id=token_data.sub)
    if not current_user:
        raise credentials_exception
    return current_user

def get_current_active_user(
        current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    """Relies on the dependency injection system to test if the user is active."""
    if not user.is_active(current_user):
        raise HTTPException(
            status_code=400, detail="Inactive user"
        )
    return current_user

def get_current_active_superuser(
        current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    """Relies on the dependency injection system to test if the user is an admin"""
    if not user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough priviledges.")
    return current_user
