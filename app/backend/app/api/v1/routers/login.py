#!/usr/bin/env python3
"""Module handles everything to do with logging into the application."""
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core.settings_config import settings
from app.core.security import create_access_token
from app.crud import user
from app.schemas import Token


router = APIRouter(
    tags=['login'],
    responses={400: {'description': 'Bad Request'}}
)

@router.post('/login/access-token', response_model=Token)
async def login_for_access_token(
    db: Annotated[Session, Depends(deps.get_db)],
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """Utilise OAuth2 scheme to facilitate login and token credentials"""
    current_user = user.authenticate(
        db, email=form_data.username, password=form_data.password)
    if not current_user:
        raise HTTPException(
            status_code=400,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    elif not user.is_active(current_user):
        raise HTTPException(
            status_code=400, detail='Inactive user'
        )
    access_token_expires=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        'access_token': create_access_token(current_user.id, access_token_expires),
        'token_type': 'bearer',
    }