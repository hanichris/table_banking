#!/usr/bin/env python3
"""Generate a `Declarative Base` class employing the declarative mapping approach

With the declarative base class, new mapped classes are declared as subclasses
of the base.
https://docs.sqlalchemy.org/en/20/orm/declarative_styles.html
"""
from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.orm import DeclarativeBase, declared_attr


class Base(DeclarativeBase):
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

association_table = Table(
    'association_table',
    Base.metadata,
    Column('left_id', ForeignKey('user.id')),
    Column('right_id', ForeignKey('bank.id')),
)