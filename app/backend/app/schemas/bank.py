#!/usr/bin/env python3
"""Pydantic models defining the `bank` data.

These models will parse the data providing validation and conversion
(whenever necessary.)
"""
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class BankBase(BaseModel):
    """Model defining the common base attributes of a `table` bank."""
    title: str
    interest_rate: Decimal = Decimal(0)
    amount: Decimal = Decimal(0)

class BankCreate(BankBase):
    """Model defining properties to receive on `bank` creation."""
    admin_id: int

class BankUpdate(BankBase):
    """Model defining the properties to receive on `bank` update."""
    amount_loaned_out: Decimal

class Bank(BankBase):
    id: int
    admin_id: int

    model_config = ConfigDict(from_attributes=True)
