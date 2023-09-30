from fastapi.testclient import TestClient
from httpx import Response
import pytest

from app.core.settings_config import settings


@pytest.fixture(scope='class')
def request_access(client: TestClient, superuser_token_header):
    yield client, superuser_token_header

class TestSuperUser:
    @pytest.fixture(scope='class')
    def get_superuser(self, request_access):
        client, superuser_token_header = request_access
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
