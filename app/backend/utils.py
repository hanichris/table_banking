#!/usr/bin/env python3
"""Utility functions to aid in sending emails for password recovery."""
from datetime import datetime, timedelta

import emails
from emails.template import JinjaTemplate
from jose import jwt

from app.core.settings_config import settings


def send_email():
    pass

def send_reset_password_email():
    pass

def send_new_account_email():
    pass

def generate_password_reset_token():
    pass

def verify_password_reset_token():
    pass
