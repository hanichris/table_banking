#!/usr/bin/env python3
"""Create the `Bank` class indicating a table within the database.

Employs the `mapped_column()` construct to indicate the columns
within the database table to be generated. The construct utilises
the SQLAlchemy type `Mapped` to derive its column-configuration
information.
"""

from datetime import datetime

from sqlalchemy import ForeignKey, func, FetchedValue
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, relationship

from app.db.base_class import Base, association_table


class Bank(Base):
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    admin_id: Mapped[int | None] = mapped_column(ForeignKey('user.id'))
    title: Mapped[str] = mapped_column(unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(onupdate=func.now(), server_default=func.now(), server_onupdate=FetchedValue())
    interest_rate: Mapped[int] = mapped_column(insert_default=int)
    amount: Mapped[int] = mapped_column(insert_default=0)
    loaned_out_amount: Mapped[int] = mapped_column(insert_default=0)

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
