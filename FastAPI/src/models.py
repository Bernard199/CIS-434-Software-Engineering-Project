from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

# User model
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(25), index=True, nullable=False)
    password = Column(String(25), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.role_id"))

    # Relationship to tasks
    tasks = relationship("Task", back_populates="owner")

# Task model
class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(25), index=True, nullable=False)
    description = Column(String(60), nullable=True)
    category = Column(String(25), nullable=True)
    priority = Column(Integer, default=1)
    deadline = Column(DateTime, nullable=True)
    status = Column(String(25), nullable=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    # Many tasks belong to one user
    owner = relationship("User", back_populates="tasks")
