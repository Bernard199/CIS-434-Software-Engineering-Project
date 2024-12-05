from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from .database import engine, Base, get_db
from .models import User, Task

# Create the tables in the database (if not already created)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation and response serialization
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    priority: int
    deadline: Optional[str] = None
    status: Optional[str] = None
    user_id: int

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[int] = None
    deadline: Optional[str] = None
    status: Optional[str] = None

class TaskResponse(BaseModel):
    task_id: int
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    priority: int
    deadline: Optional[str] = None
    status: Optional[str] = None
    user_id: int

    class Config:
        orm_mode = True

# Revised CRUD operations for tasks
@app.post("/tasks/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.user_id == task.user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_task = Task(
        title=task.title,
        description=task.description,
        category=task.category,
        user_id=task.user_id,
        priority=task.priority,
        deadline=task.deadline,
        status=task.status
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.get("/tasks/", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update fields only if provided
    if task.title is not None:
        db_task.title = task.title
    if task.description is not None:
        db_task.description = task.description
    if task.category is not None:
        db_task.category = task.category
    if task.priority is not None:
        db_task.priority = task.priority
    if task.deadline is not None:
        db_task.deadline = task.deadline
    if task.status is not None:
        db_task.status = task.status

    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.task_id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted successfully"}
