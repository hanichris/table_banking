#!/usr/bin/env python3
"""Pydantic model defining the schema for user data.

This model will provide validation, conversion (where necessary)
and data parsing.
"""
from pydantic import BaseModel, EmailStr, ConfigDict


class UserBase(BaseModel):
    """Model defining the base attributes of a user."""
    email: EmailStr
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
    is_active: bool

class User(UserBase):
    """Model used when reading the data from an API endpoint.

    Provides configuration to enable Pydantic to read data even if it's not
    a `dict`, but an ORM model. Makes it compatible with ORMs.
    """
    id: int
    is_active: bool
    username: str
    tables: list[Table] = []

    model_config = ConfigDict(from_attributes=True)
