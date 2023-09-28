#!/usr/bin/env python3
"""Define the base class for CRUD operations."""
from typing import Any, Generic, TypeVar

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.base_class import Base


ModelType = TypeVar('ModelType', bound=Base)
CreateSchemaType = TypeVar('CreateSchemaType', bound=BaseModel)
UpdateSchemaType = TypeVar('UpdateSchemaType', bound=BaseModel)

class CRUDBase(
    Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """Base class for CRUD operations that inherits from the Generic base class.

    The `Generic` class which this class inherits from has been parameterized
    by three type variables - `ModelType`, `CreateSchemaType` and
    `UpdateSchemaType`.
    """
    def __init__(self, model: type[ModelType]) -> None:
        """CRUD object with default methods to Create, Read, Update & Delete.

        Args:
            * `model`: A SQLAlchemy model class.
        """
        self.model = model

    def get(self, db: Session, /, *, id: int) -> ModelType | None:
        return db.get(self.model, id)

    def get_multi(
            self, db: Session, /, *, skip: int = 0, limit: int = 100
            ) -> list[ModelType]:
        stmt = select(self.model).offset(skip).limit(limit)
        return db.execute(stmt).scalars().unique().all()

    def create(
            self, db: Session, /, *, obj_in: CreateSchemaType
    ) -> ModelType:
        data = jsonable_encoder(obj_in)
        db_obj = self.model(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    def update(
            self,
            db: Session, /, *,
            db_obj: ModelType,
            obj_in: dict[str, Any],
    ) -> ModelType:
        db_obj_data = jsonable_encoder(db_obj)
        for field in db_obj_data:
            if field in obj_in:
                setattr(db_obj, field, obj_in[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self):
        pass
