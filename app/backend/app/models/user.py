#!/usr/bin/env python3
"""Create the `User` class indicating a table within the database.

Employs the `mapped_column()` construct to indicate the columns
within the database table to be generated. The construct utilises
the SQLAlchemy type `Mapped` to derive its column-configuration
information.
"""
import datetime
from uuid import UUID, uuid4

from sqlalchemy import func, FetchedValue
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, relationship

from app.db.base_class import Base, association_table


class User(Base):
    id: Mapped[UUID] = mapped_column(primary_key=True, index=True, default=lambda: uuid4())
    email: Mapped[str] = mapped_column(unique=True, index=True)
    full_name: Mapped[str | None] = mapped_column(index=True)
    created_at: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(onupdate=func.now(), server_default=func.now(), server_onupdate=FetchedValue())
    password: Mapped[str] = mapped_column()
    is_active: Mapped[bool] = mapped_column(insert_default=True)
    is_superuser: Mapped[bool] = mapped_column(insert_default=False)

    banks = relationship(
        "Bank",
        collection_class=set,
        secondary=association_table,
        lazy='selectin',
        back_populates='members')

    banks_admin = relationship(
        "Bank",
        collection_class=set,
        lazy='selectin',
        back_populates='admin')
    
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, email={self.email!r}, created_at={self.created_at!r}, is_admin={self.is_active!r})"
