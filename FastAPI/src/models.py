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
    username = Column(String(50), index=True, nullable=False)  # Increased length if needed
    password = Column(String(255), nullable=False)  # Keep this long enough for hashed passwords
    role_id = Column(Integer, ForeignKey("roles.role_id"))

    # Relationship to role
    role = relationship("Role", back_populates="users")

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

    # Relationship to User: many tasks belong to one user
    owner = relationship("User", back_populates="tasks")