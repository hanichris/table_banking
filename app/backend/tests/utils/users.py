from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.settings_config import settings
from app.schemas import UserCreate, UserUpdate
from app.crud import user
from .utils import random_password


def user_authentication_headers(
        *,
        client: TestClient,
        email: str,
        password: str
) -> dict[str, str]:
    data = {'username': email, 'password': password}

    res = client.post(f'{settings.API_V1_STR}/login/access-token', data=data)
    token = res.json()
    return {'Authorization': f"Bearer {token['access_token']}"}

def user_authentication_token(
        *,
        client: TestClient,
        db: Session,
        email: str
) -> dict[str, str]:
    pwd = random_password()
    retrieved_user = user.get_by_email(db, email=email)
    if not retrieved_user:
        user_in_create = UserCreate(email=email, password=pwd)
        _ = user.create_user(db, obj_in=user_in_create)
    else:
        user_in_update = UserUpdate(password=pwd)
        _ = user.update_user(
            db,
            user_db_model=retrieved_user,
            obj_in=user_in_update
        )
    return user_authentication_headers(client=client, email=email, password=pwd)