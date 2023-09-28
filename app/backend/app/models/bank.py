#!/usr/bin/env python3
"""Create the `Bank` class indicating a table within the database.

Employs the `mapped_column()` construct to indicate the columns
within the database table to be generated. The construct utilises
the SQLAlchemy type `Mapped` to derive its column-configuration
information.
"""

from decimal import Decimal

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, relationship

from app.db.base_class import Base, association_table


class Bank(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    admin_id: Mapped[int | None] = mapped_column(ForeignKey('user.id'))
    title: Mapped[str] = mapped_column(unique=True, index=True)
    interest_rate: Mapped[Decimal] = mapped_column(insert_default=Decimal(0))
    amount: Mapped[Decimal] = mapped_column(insert_default=Decimal(0))
    loaned_out_amount: Mapped[Decimal] = mapped_column(insert_default=Decimal(0))

    members = relationship(
        "User",
        collection_class=set,
        secondary=association_table,
        lazy='selectin',
        back_populates='banks')

    admin = relationship(
        "User",
        collection_class=set,
        lazy='selectin',
        back_populates='banks_admin')
