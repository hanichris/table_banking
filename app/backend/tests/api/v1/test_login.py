from fastapi.testclient import TestClient
from httpx import Response
import pytest

from app.core.settings_config import settings


@pytest.fixture(scope='module')
def login_failure(client: TestClient, fake_user: dict[str, str]):
    data = {
        'username': fake_user.get('user_email'),
        'password': fake_user.get('user_pwd')
    }
    res = client.post(f'{settings.API_V1_STR}/login/access-token', data=data)
    return res

@pytest.fixture(scope='module')
def login_success(client: TestClient):
    data = {
        'username': settings.FIRST_SUPERUSER,
        'password': settings.FIRST_SUPERUSER_PASSWORD
    }
    res = client.post(f'{settings.API_V1_STR}/login/access-token', data=data)
    return res

def test_login_success_response_status(login_success: Response):
    assert login_success.status_code == 200

def test_login_success_access_token_type(login_success: Response):
    res = login_success.json()
    assert res.get('token_type') == 'bearer'

def test_login_failure_response_status(login_failure: Response):
    assert login_failure.status_code == 400

def test_login_failure_response_message(login_failure: Response):
    res = login_failure.json()
    assert res.get('detail') == 'Incorrect username or password'

def test_login_failure_response_header(login_failure: Response):
    res = login_failure.headers
    assert res.get('WWW-Authenticate') == 'Bearer'