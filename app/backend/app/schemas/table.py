#!/usr/bin/env python3
"""Pydantic models defining the `table` data.

These models will parse the data providing validation and conversion
(whenever necessary.)
"""
from decimal import Decimal

from pydantic import BaseModel, ConfigDict

from user import User


class TableBase(BaseModel):
    """Model defining the common base attributes of a `table` bank."""
    title: str
    interest_rate: Decimal = Decimal(0)
    amount: Decimal = Decimal(0)

class TableCreate(TableBase):
    """Model defining properties to receive on `table` creation."""
    admin_id: int

class TableUpdate(TableBase):
    """Model defining the properties to receive on `table` update."""
    amount_loaned_out: Decimal

class Table(TableBase):
    id: int
    admin_id: int

    model_config = ConfigDict(from_attributes=True)

class TableUsers(Table):
    """Model defining the users who are apart of a `table`.

    Avoids the creation of a circular dependency.
    """
    users: list[User] = []