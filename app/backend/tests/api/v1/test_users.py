from fastapi.testclient import TestClient
from httpx import Response
import httpx
import pytest

from app.core.settings_config import settings
from app.crud import user
from ...utils.utils import random_password


class TestSuperUser:
    @pytest.fixture(scope='class')
    def get_superuser(self, client: TestClient, superuser_token_header):
        res = client.get(
            f'{settings.API_V1_STR}/users/me',
            headers=superuser_token_header
        )
        return res.json()

    def test_superuser_get_me(self, get_superuser):
        assert get_superuser

    def test_user_is_superuser(self, get_superuser):
        assert get_superuser['is_superuser'] == True

    def test_superuser_is_active(self, get_superuser):
        assert get_superuser['is_active'] == True

    def test_superuser_email(self, get_superuser):
        assert get_superuser['email'] == settings.FIRST_SUPERUSER

class TestSuperuserCreator:
    @pytest.fixture(scope='class')
    def create_user(self, client: TestClient, superuser_token_header, fake_user):
        r = client.post(
            f'{settings.API_V1_STR}/users',
            headers=superuser_token_header,
            json={'email': fake_user['user_email'],
                  'password': fake_user['user_pwd']}
        )
        return r

    def test_superuser_create_user_status_code(self, create_user: Response):
        assert create_user.status_code == httpx.codes.CREATED
    
    def test_superuser_create_user_db(self, create_user: Response, fake_user, db):
        res = create_user.json()
        stored_user = user.get_by_email(db, email=fake_user['user_email'])
        assert res['email'] == stored_user.email
    
def test_superuser_retrive_users(client: TestClient, superuser_token_header):
    res = client.get(f'{settings.API_V1_STR}/users', headers=superuser_token_header)
    all_users = res.json()
    assert len(all_users) > 1

def test_superuser_create_existing_user(
        client: TestClient, superuser_token_header
):
    data = {'email': settings.FIRST_SUPERUSER, 'password': random_password()}
    res = client.post(
        f'{settings.API_V1_STR}/users',
        headers=superuser_token_header,
        json={'email': settings.FIRST_SUPERUSER,
              'password': random_password()}
    )
    detail = res.json()
    assert res.status_code == 400
    assert detail['detail'] == 'This username is already taken.'

class TestUser:
    @pytest.fixture(scope='class')
    def get_user(self, client: TestClient, normal_user_token):
        res = client.get(
            f'{settings.API_V1_STR}/users/me',
            headers=normal_user_token
        )
        return res.json()

    def test_user_get_me(self, get_user):
        assert get_user

    def test_user_is_not_superuser(self, get_user):
        assert get_user['is_superuser'] == False

    def test_user_is_active(self, get_user):
        assert get_user['is_active'] == True

    def test_user_email(self, get_user):
        assert get_user['email'] == settings.EMAIL_TEST_USER

def test_creation_by_normal_user(client: TestClient, normal_user_token, fake_user):
    res = client.post(
        f'{settings.API_V1_STR}/users',
        headers=normal_user_token,
        data={'email': fake_user['user_email'],
              'password': fake_user['user_pwd']}
    )
    detail = res.json()
    assert res.status_code == 400
    assert detail['detail'] == "The user doesn't have enough priviledges."