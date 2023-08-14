#!/usr/bin/env python3
"""Generate a `Declarative Base` class employing the declarative mapping approach

With the declarative base class, new mapped classes are declared as subclasses
of the base.
https://docs.sqlalchemy.org/en/20/orm/declarative_styles.html
https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html#many-to-many
"""
from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.orm import DeclarativeBase, declared_attr


class Base(DeclarativeBase):
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

# To create a simple many-to-many relationship, we setup an association/junction
# table. It is recommended to that the two columns referring to the two entity
# tables are established with a unique constraint or primary key constraint
# to ensure that duplicate rows aren't persisted.
association_table = Table(
    'association_table',
    Base.metadata,
    Column('left_id', ForeignKey('user.id'), primary_key=True),
    Column('right_id', ForeignKey('bank.id'), primary_key=True),
)