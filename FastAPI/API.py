#Fast api for software project

from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

#Authentication
@app.post("/login")
def login():
    return {"login": "success"}

@app.post("/logout")
def logout():
    return {"logout": "success"}

@app.post("/register")
def register():
    return {"register": "success"}

#User Management
@app.get("/users")
def users():
    return {"users": "success"}

@app.get("/user/{user_id}")
def user(user_id: int):
    return {"user_id": user_id}
            

@app.put("/user/{user_id}")
def update_user(user_id: int):
    return {"update_user": user_id}

@app.delete("/user/{user_id}") 
def delete_user(user_id: int):
    return {"delete_user": user_id}

#Task Management
@app.get("/tasks")
def tasks():
    return {"tasks": "success"}

@app.post("/tasks")
def create_task():
    return {"create_task": "success"}

@app.get("/task/{task_id}")
def task(task_id: int):
    return {"task_id": task_id}

@app.put("/task/{task_id}")
def update_task(task_id: int):
    return {"update_task": task_id}

@app.delete("/task/{task_id}")
def delete_task(task_id: int):
    return {"delete_task": task_id}

