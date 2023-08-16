#!/usr/bin/env python3
"""Circumvents circular import error."""
from .bank import Bank
from .user import User


class UserBanks(User):
    """Model defining the banks a user is a part of.

    Avoids a circular dependency.
    """
    # The banks for which the user is a member.
    banks: list[Bank] = []
    # The banks for which the user is an admin.
    banks_admin: list[Bank] = []

class BankUsers(Bank):
    """Model defining the users who are apart of a `bank`.

    Avoids the creation of a circular dependency.
    """
    members: list[User] = []
