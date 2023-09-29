#!/usr/bin/env python3
"""Configuration of the fixture scope"""
from typing import Generator

import pytest
from fastapi.testclient import TestClient

from main import app
from app.db.db_setup import SessionLocal
from .utils.utils import (
    get_superuser_token_header,
    random_email,
    random_lowercase_str,
    random_password)


@pytest.fixture(scope='module')
def fake_user():
    data = {
        'user_email': random_email(),
        'user_pwd': random_password(),
        'user_full_name': random_lowercase_str()
    }
    return data

@pytest.fixture(scope='session')
def db() -> Generator:
    db = SessionLocal()
    yield db
    db.close()

@pytest.fixture(scope='module')
def client() -> Generator:
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope='module')
def superuser_token_header(client: TestClient) -> dict[str, str]:
    return get_superuser_token_header(client)