#!/usr/bin/env python3
"""Define the `Settings` class.

This class extends the `BaseSettings` class defined in pydantic
offering the option of loading settings or configurations from
environment variables or secrets files.
"""
import secrets

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    API_V1_STR: str = '/api/v1'
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # SERVER_NAME: str
    # No. of minutes totalling 8 days.
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    # SERVER_NAME: str
    # SERVER_HOST: AnyHttpUrl

    SECURITY_CONIFIG_FILE: str = 'app/backend/app/security.ini'


settings = Settings()