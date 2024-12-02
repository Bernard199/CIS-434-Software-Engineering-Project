from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# User model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # Adding a password field for user authentication
    
    # One user can have many tasks
    tasks = relationship("Task", back_populates="owner")

# Task model
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(Integer, default=1)  # Adding priority, with default value
    due_date = Column(DateTime, nullable=True)  # Adding due date for tasks
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # ForeignKey to User

    # Many tasks belong to one user
    owner = relationship("User", back_populates="tasks")
