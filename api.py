from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
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

# User CRUD operations --------------------------------------------------------------------

@app.post("/users/")
def create_user(username: str, password: str, db: Session = Depends(get_db)):
    # Create a new user in the database
    db_user = User(username=username, password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    # Get a user by ID
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    # Get all users
    return db.query(User).all()

@app.put("/users/{user_id}")
def update_user(user_id: int, username: str, password: str, db: Session = Depends(get_db)):
    # Update an existing user's details
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = username
    db_user.password = password
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

@app.post("/tasks/")
def create_task(title: str, description: str, user_id: int, db: Session = Depends(get_db)):
    # Create a new task and associate it with a user
    db_task = Task(title=title, description=description, user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):
    # Get a task by ID
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.get("/tasks/")
def get_tasks(db: Session = Depends(get_db)):
    # Get all tasks
    return db.query(Task).all()

@app.put("/tasks/{task_id}")
def update_task(task_id: int, title: str, description: str, db: Session = Depends(get_db)):
    # Update an existing task
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = title
    db_task.description = description
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
