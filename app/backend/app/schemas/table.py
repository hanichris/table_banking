#!/usr/bin/env python3
"""Pydantic models defining the `table` data.

These models will parse the data providing validation and conversion
(whenever necessary.)
"""
from pydantic import BaseModel, ConfigDict


class TableBase(BaseModel):
    pass

class TableCreate(TableBase):
    pass

class TableUpdate(TableBase):
    pass

class Table(TableBase):
    model_config = ConfigDict(from_attributes=True)