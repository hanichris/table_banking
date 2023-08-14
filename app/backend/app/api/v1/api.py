#!/usr/bin/env python3
from fastapi import APIRouter

from .routers import login, users


api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)