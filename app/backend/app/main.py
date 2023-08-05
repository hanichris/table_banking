#!/usr/bin/env python3
"""Main application."""
from fastapi import FastAPI

from config.security import pwd_context




print(f'Security password configuration:\n{pwd_context.to_string()}')