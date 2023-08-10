#!/usr/bin/env python3
"""Initialize the Database.

Involves creating the first superuser within the database.
"""
from sqlalchemy.orm import Session

from app.core.settings_config import settings
