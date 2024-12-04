from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

# Role model
class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(25), unique=True, index=True, nullable=False)

    # Relationship to users
    users = relationship("User", back_populates="role")

# User model
class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(25), index=True, nullable=False)
    password = Column(String(25), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.role_id"))

    # Relationship to role
    role = relationship("Role", back_populates="users")

    # Relationship to tasks
    tasks = relationship("Task", back_populates="owner")

# Task model
class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)  # Auto-increment handled by default
    title = Column(String(25), index=True, nullable=False)  # Title is required
    description = Column(String(60), nullable=True)  # Description is optional
    category = Column(String(25), nullable=True)  # Category is optional
    priority = Column(Integer, default=1)  # Default priority is 1
    deadline = Column(DateTime, nullable=True)  # Deadline is optional
    status = Column(String(25), nullable=True)  # Status is optional (consider making it required based on business rules)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)  # Foreign key to users table

    # Relationship to User: many tasks belong to one user
    owner = relationship("User", back_populates="tasks")
