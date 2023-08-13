#!/usr/bin/env python3
"""Initialize the Database.

Involves creating the first superuser within the database.
"""
from sqlalchemy.orm import Session

from app.core.security import pwd_context
from app.core.settings_config import settings
from app.schemas import UserCreate
from .db_setup import engine
from . import Base

import app.crud as crud


def init_db(db: Session) -> None:
    """Creates the tables in the database and the admin user.
    
    Employs the `MetaData` collection to emit `DDL` to facilitate
    the creation of the database tables. This is done by invoking
    the `create_all()` method which takes the `engine` referencing
    the target database.
    https://docs.sqlalchemy.org/en/20/tutorial/metadata.html#tutorial-emitting-ddl
    """
    Base.metadata.create_all(bind=engine)
    
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        crud.user.create_user(db, obj_in=user_in)