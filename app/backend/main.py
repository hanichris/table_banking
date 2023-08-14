#!/usr/bin/env python3
"""Main application."""
from fastapi import FastAPI

from app.api.v1.api import api_router
from app.core.security import pwd_context
from app.core.settings_config import settings


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f'{settings.API_V1_STR}/openapi.json',
    )
pwd_context.load_path(settings.SECURITY_CONIFIG_FILE)

app.include_router(api_router, prefix=settings.API_V1_STR)
