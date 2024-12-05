from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from .database import engine, Base, get_db
from .models import User, Task

# Create the tables in the database (if not already created)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust the list to the domains that are allowed to access your API.
    allow_credentials=True,
    allow_methods=["*"],  # You can specify the methods you want to allow or use ["GET", "POST", "PUT", "DELETE"].
    allow_headers=["*"],  # You can specify the headers you want to allow.
)

# Pydantic schema for user creation and login
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Pydantic schema for task creation and update
class TaskCreate(BaseModel):
    title: str
    description: str
    user_id: int
    priority: int = 1
    deadline: str = None
    status: str = None

class TaskUpdate(BaseModel):
    title: str
    description: str

# User CRUD operations --------------------------------------------------------------------

@app.post("/users/", response_model=UserCreate)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Create a new user in the database without hashing the password
    db_user = User(username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    # Check if the user exists
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user is None or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    # Mock token for simplicity
    return {"token": f"mock-token-for-{user.username}"}

@app.get("/users/{user_id}", response_model=UserCreate)
def get_user(user_id: int, db: Session = Depends(get_db)):
    # Get a user by ID
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/", response_model=List[UserCreate])
def get_users(db: Session = Depends(get_db)):
    # Get all users
    return db.query(User).all()

@app.put("/users/{user_id}", response_model=UserCreate)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    # Update an existing user's details
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = user.username
    db_user.password = user.password
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Delete a user from the database
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

# Task CRUD operations --------------------------------------------------------------------

@app.post("/tasks/", response_model=TaskCreate)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    print(f"Received task data: {task}")  # Debug log to see incoming task data
    db_user = db.query(User).filter(User.user_id == task.user_id).first()
    if db_user is None:
        print(f"User not found for user_id: {task.user_id}")  # Log if user_id is invalid
        raise HTTPException(status_code=404, detail="User not found")

    db_task = Task(
        title=task.title,
        description=task.description,
        user_id=task.user_id,
        priority=task.priority,
        deadline=task.deadline,
        status=task.status
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    print(f"Task created successfully: {db_task}")  # Log successful task creation
    return db_task


@app.get("/tasks/{task_id}", response_model=TaskCreate)
def get_task(task_id: int, db: Session = Depends(get_db)):
    # Get a task by ID
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.get("/tasks/", response_model=List[TaskCreate])
def get_tasks(db: Session = Depends(get_db)):
    # Get all tasks
    return db.query(Task).all()

@app.put("/tasks/{task_id}", response_model=TaskCreate)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    # Update an existing task
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.description = task.description
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    # Delete a task from the database
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
