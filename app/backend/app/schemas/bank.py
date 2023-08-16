#!/usr/bin/env python3
"""Pydantic models defining the `bank` data.

These models will parse the data providing validation and conversion
(whenever necessary.)
"""
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class BankBase(BaseModel):
    """Model defining the common base attributes of a `table` bank."""
    title: str | None = None
    interest_rate: Decimal = Decimal(0)
    amount: Decimal = Decimal(0)
    loaned_out_amount: Decimal = Decimal(0)

class BankCreate(BankBase):
    """Model defining properties to receive on `bank` creation."""
    title: str

class BankUpdate(BankBase):
    """Model defining the properties to receive on `bank` update."""
    pass

class Bank(BankBase):
    id: int
    admin_id: int

    model_config = ConfigDict(from_attributes=True)
