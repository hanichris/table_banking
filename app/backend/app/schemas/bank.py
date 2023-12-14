#!/usr/bin/env python3
"""Pydantic models defining the `bank` data.

These models will parse the data providing validation and conversion
(whenever necessary.)
"""


from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BankBase(BaseModel):
    """Model defining the common base attributes of a `table` bank."""
    title: str | None = None
    interest_rate: int = 0
    amount: int = 0
    loaned_out_amount: int = 0

class BankCreate(BankBase):
    """Model defining properties to receive on `bank` creation."""
    title: str

class BankUpdate(BankBase):
    """Model defining the properties to receive on `bank` update."""
    admin_id: int | None = None

class Bank(BankBase):
    id: int
    admin_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
