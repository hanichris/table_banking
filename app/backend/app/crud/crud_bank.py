#!/usr/bin/env python3
"""Define CRUD operations for SQLAlchemy class `Bank`"""
from fastapi.encoders import jsonable_encoder
from sqlalchemy import select
from sqlalchemy.orm import Session

from .base import CRUDBase
from app.models import Bank, User
from app.schemas import BankCreate, BankUpdate


class CRUDBank(CRUDBase[Bank, BankCreate, BankUpdate]):
    """Extends CRUDBase to provide bank specific crud operations."""
    def create_with_owner(
            self,
            db: Session, /, *,
            admin_id: int,
            obj_in: BankCreate
    ) -> Bank:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, admin_id=admin_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def add_bank_member(
            self,
            db: Session, /, *,
            bank_model: Bank,
            user_model: User
    ):
        bank_model.members.add(user_model)
        db.add(bank_model)
        db.commit()

    def remove_bank_member(
            self,
            db: Session, /, *,
            bank_model: Bank,
            user_model: User
    ):
        bank_model.members.remove(user_model)
        db.add(bank_model)
        db.commit()

    def get_multi_by_admin(
            self,
            db: Session, /, *,
            admin_id: int, 
            skip: int = 0,
            limit: int = 100
    ) -> list[Bank]:
        return db.execute(
            select(self.model)
            .filter_by(admin_id=admin_id)
            .offset(skip)
            .limit(limit)).scalars().unique().all()
