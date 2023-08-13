#!/usr/bin/env python3
"""Main application."""
from fastapi import FastAPI

from app.core.security import pwd_context, create_access_token
from app.core.settings_config import settings


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f'{settings.API_V1_STR}/openapi.json',
    )
pwd_context.load_path(settings.SECURITY_CONIFIG_FILE)

@app.get('/{username}')
async def main(username: str):
    return create_access_token(username)