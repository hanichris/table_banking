import random
import string

from fastapi.testclient import TestClient

from app.core.settings_config import settings


def get_superuser_token_header(client: TestClient) -> dict[str, str]:
    login_cred = {
        'username': settings.FIRST_SUPERUSER,
        'password': settings.FIRST_SUPERUSER_PASSWORD
    }
    res = client.post(f'{settings.API_V1_STR}/login/access-token', data=login_cred)
    token = res.json()
    return {"Authorization": f"Bearer {token.get('access_token')}"}

def random_lowercase_str() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=32))

def random_email() -> str:
    return f'{random_lowercase_str()}@{random_lowercase_str()}.com'

def random_password() -> str:
    seq = string.ascii_letters + string.digits + string.punctuation
    return "".join(random.choices(seq, k=10))