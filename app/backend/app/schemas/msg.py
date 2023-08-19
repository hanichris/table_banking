#!/usr/bin/env python3
"""Provide schema for message output based on pydantic's BaseModel"""
from pydantic import BaseModel


class Msg(BaseModel):
    msg: str
