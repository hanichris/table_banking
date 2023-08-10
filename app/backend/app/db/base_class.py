#!/usr/bin/env python3
"""Generate a `Declarative Base` class employing the declarative mapping approach

With the declarative base class, new mapped classes are declared as subclasses
of the base.
https://docs.sqlalchemy.org/en/20/orm/declarative_styles.html
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
