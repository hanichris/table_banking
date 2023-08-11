#!/usr/bin/env python3
"""Initialize the Database.

Involves creating the first superuser within the database.
"""
from sqlalchemy.orm import Session

from app.core.settings_config import settings
from app.schemas import UserCreate
from .db_setup import engine
from . import Base


def init_db(db: Session) -> None:
    """Creates the tables in the database and the admin user.
    
    Employs the `MetaData` collection to emit `DDL` to facilitate
    the creation of the database tables. This is done by invoking
    the `create_all()` method which takes the `engine` referencing
    the target database.
    https://docs.sqlalchemy.org/en/20/tutorial/metadata.html#tutorial-emitting-ddl
    """
    Base.metadata.create_all(bind=engine)