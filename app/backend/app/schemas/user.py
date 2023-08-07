#!/usr/bin/env python3
"""Pydantic models defining the schema for user data.

These models will provide validation, conversion (where necessary)
and data parsing.
"""
from pydantic import BaseModel, EmailStr, ConfigDict

from table import Table


class UserBase(BaseModel):
    """Model defining the base attributes of a user."""
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None

class UserCreate(UserBase):
    """Model detailing user attributes needed during creation.

    Adds onto the base attributes of a User.
    """
    password: str
    username: str

class UserUpdate(UserBase):
    """Model detailing the user attributes that are eligible for updates.

    Enable a user to primarily update their `password` or to `deactivate`
    their account.
    """
    password: str | None = None

class User(UserBase):
    """Model used when reading the data from an API endpoint.

    Provides configuration to enable Pydantic to read data even if it's not
    a `dict`, but an ORM model. Makes it compatible with ORMs.
    """
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)

class UserTables(User):
    """Model defining the users who are apart of a `table`.

    Avoids a circular dependency.
    """
    tables: list[Table] = []