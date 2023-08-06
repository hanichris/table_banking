#!/usr/bin/env python3
"""Define a Pydantic Model for use in the token endpoint.

The response of the `token` endpoint MUST be a JSON object
with a `token_type` key and an `access_token` key.
"""
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: int | None = None
    scopes: list[str] = []