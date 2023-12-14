#!/usr/bin/env python3
"""Initialize the database with the creation of the administrative credentials.

Relies on previously defined and implemented functions. Logs the creation process.
"""
from app.db.init_db import init_db
from app.db.db_setup import SessionLocal


def init() -> None:
    """Utilises a database session to create the admin within the DB."""
    with SessionLocal() as session:
        init_db(session)

def main() -> None:
    """Entry point of the script.

    Calls the initiation function `init` defined above.
    """
    init()
    print('Initial data generated.')

if __name__ == "__main__":
    from app.core.security import pwd_context
    from app.core.settings_config import settings
    
    pwd_context.load_path(settings.SECURITY_CONIFIG_FILE)
    main()