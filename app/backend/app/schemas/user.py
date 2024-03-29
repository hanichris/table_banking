#!/usr/bin/env python3
"""Pydantic models defining the schema for user data.

These models will provide validation, conversion (where necessary)
and data parsing.
"""
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class UserBase(BaseModel):
    """Model defining the base attributes of a user."""
    email: EmailStr | None = None
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None

class UserCreate(UserBase):
    """Model detailing user attributes needed during creation.

    Adds onto the base attributes of a User.
    """
    email: EmailStr
    password: str

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
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserInDB(User):
    """Obtain additional properties of the user stored in the database."""
    password: str