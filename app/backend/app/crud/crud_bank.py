#!/usr/bin/env python3
"""Define CRUD operations for SQLAlchemy class `Bank`"""
from typing import Sequence
from uuid import UUID

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
            admin_id: UUID,
            obj_in: BankCreate
    ) -> Bank:
        """Create a new table bank and link it with an admin.

        Args:
            * `db`: A session object.
            * `admin_id`: The table banks's administrator.
            * `obj_in`: The details pertaining to a new table bank.

        Returns:
            * `Bank` - A SQLAlchemy class instance with updated attributes (id).
        """
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
    ) -> Bank:
        """Add a member to the particular table bank.

        Args:
            * `db`- A session object.
            * `bank_model` - A SQLAlchemy class instance of the table bank.
            * `user_model` - A SQLAlchemy class instance of the user to add.

        Returns:
            * `Bank` - A SQLAlchemy class instance of the bank with the updates.
        """
        bank_model.members.add(user_model)
        db.add(bank_model)
        db.commit()
        db.refresh(bank_model)
        return bank_model

    def remove_bank_member(
            self,
            db: Session, /, *,
            bank_model: Bank,
            user_model: User
    ) -> Bank:
        """Remove a member from the particular table bank.

        Args:
            * `db`- A session object.
            * `bank_model` - A SQLAlchemy class instance of the table bank.
            * `user_model` - A SQLAlchemy class instance of the user to remove.

        Returns:
            * `Bank` - A SQLAlchemy class instance of the bank with the updates.
        """
        bank_model.members.remove(user_model)
        db.add(bank_model)
        db.commit()
        db.refresh(bank_model)
        return bank_model

    def get_multi_by_admin(
            self,
            db: Session, /, *,
            admin_id: int, 
            skip: int = 0,
            limit: int = 100
    ) -> Sequence[Bank]:
        """Obtain a list of `Bank` instances in a paginated manner.

        Args:
            * `db` - A session object.
            * `admin_id` - The admin of a particular table bank.
            * `skip` - The offset to start indexing the list from.
            * `limit` - The maximum number of table banks to get per request.
    
        Returns:
            * A list of the `Bank` instances.
        """
        return db.execute(
            select(self.model)
            .filter_by(admin_id=admin_id)
            .offset(skip)
            .limit(limit)).scalars().unique().all()
    
    def update_bank(
            self,
            db: Session, /, *,
            bank_db_model: Bank,
            obj_in: BankUpdate
    ):
        """"""
        update_data = obj_in.model_dump(exclude_unset=True)
        return super().update(db, db_obj=bank_db_model, obj_in=update_data)
    
    def get_bank_by_title(
            self,
            db: Session, /, *,
            title: str
    ) -> Bank | None:
        """Get the bank from the database that has the given title name.

        Args:
            * `db` - A session object.
            * `title` - The bank title to query the database with.

        Returns:
            The bank details or none if no bank was found with the given name.
        """
        return db.scalar(select(self.model).filter_by(title=title))

_bank = CRUDBank(Bank)