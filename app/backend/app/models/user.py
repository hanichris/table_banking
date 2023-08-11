#!/usr/bin/env python3
"""Create the `User` class indicating a table within the database.

Employs the `mapped_column()` construct to indicate the columns
within the database table to be generated. The construct utilises
the SQLAlchemy type `Mapped` to derive its column-configuration
information.
"""
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, relationship

from app.db.base_class import Base, association_table
from app.models.bank import Bank


class User(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    full_name: Mapped[str | None] = mapped_column(index=True)
    hashed_password: Mapped[str] = mapped_column()
    is_active: Mapped[bool] = mapped_column(insert_default=True)
    is_superuser: Mapped[bool] = mapped_column(insert_default=False)

    banks: Mapped[set[Bank]] = relationship(
        secondary=association_table, back_populates='members'
    )
    banks_admin: Mapped[set[Bank]] = relationship(back_populates='admin')
