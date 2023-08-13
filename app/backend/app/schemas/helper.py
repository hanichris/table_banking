#!/usr/bin/env python3
"""Circumvents circular import error."""
from .bank import Bank
from .user import User


class UserBanks(User):
    """Model defining the users who are apart of a `table bank`.

    Avoids a circular dependency.
    """
    banks: set[Bank] = []

class BankUsers(Bank):
    """Model defining the users who are apart of a `bank`.

    Avoids the creation of a circular dependency.
    """
    users: set[User] = []
