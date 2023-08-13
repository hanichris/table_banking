#!/usr/bin/env python3
"""Define CRUD operations for SQLAlchemy class `User`."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
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

    def authenticate(
            self, db: Session, /, *, email: str, password: str
    ) -> User | None:
        new_user = self.get_by_email(db, email=email)
        if not new_user:
            return None
        if not verify_password(password, new_user.password):
            return None
        return new_user

    def is_active(self, current_user: User) -> bool:
        return current_user.is_active

    def is_superuser(self, current_user: User) -> bool:
        return current_user.is_superuser

user = CRUDUser(User)