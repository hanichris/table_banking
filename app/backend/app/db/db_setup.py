#!/usr/bin/env python3
"""Configure the database use with SQLAlchemy."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.settings_config import settings


engine = create_engine(settings.SQL_ALCHEMY_DATABASE_URI,
                       connect_args= {'check_same_thread': False},
                       echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)