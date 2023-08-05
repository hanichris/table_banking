#!/usr/bin/env python3
"""Main application."""
from fastapi import FastAPI

from core.security import pwd_context, get_password_hash, verify_password
from core.settings_config import settings


app = FastAPI()
pwd_context.load_path(settings.SECURITY_CONIFIG_FILE)