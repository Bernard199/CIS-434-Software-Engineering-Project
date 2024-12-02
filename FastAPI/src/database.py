from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

# Database URL
DATABASE_URL = "postgresql+psycopg2://username:password@localhost:5432/mydatabase"

# Create an engine
engine = create_engine(DATABASE_URL, poolclass=NullPool)

# Session maker (to handle database sessions)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
