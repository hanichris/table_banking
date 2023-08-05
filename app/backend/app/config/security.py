#!/usr/bin/env python3
"""Setup the security functionality.

Defines the hashing functionality for passwords, verifying passwords
and generating the required access token to facilitate logging into the
web application.
"""
from passlib.context import CryptContext

from .settings_config import settings


pwd_context = CryptContext()
pwd_context.load_path(settings.SECURITY_CONIFIG_FILE)
