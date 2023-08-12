from app.db.base_class import Base
# Import all the SQLAlchemy models before initializing
# the database to prevent failure of proper relationship
# creation.
from app.models.bank import Bank
from app.models.user import User