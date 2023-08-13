#!/usr/bin/env python3
"""Define CRUD operations for SQLAlchemy class `User`."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from .base import CRUDBase
from app.models import User
from app.schemas import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    """Extends `CRUDBase` class to provide user specific CRUD operations."""
    def get_by_email(self, db: Session, /, *, email: str) -> User | None:
        return db.execute(select(User).filter_by(email=email)).scalar_one_or_none()

    def create_user(self, db: Session, /, *, obj_in: UserCreate) -> User:
        obj_in.password = get_password_hash(obj_in.password)
        return super().create(db, obj_in=obj_in)

    def update_user():
        pass

    def authenticate():
        pass

    def is_active(self, user: User) -> bool:
        return user.is_active

    def is_superuser(self, user: User) -> bool:
        return user.is_superuser

user = CRUDUser(User)