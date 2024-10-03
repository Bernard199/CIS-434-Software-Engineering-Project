# Software Requirements Specification

## Task Management Software
*Team: Chase Ivanicic, Bernard Schweter*

---

### 1.0 Introduction

#### 1.1 Goals and Objectives
  - The goal of this software is to create an easy-to-use set of task management tools that can be accessed through a web portal. 
  - The objective is to provide users with a simple interface to create, organize, and manage tasks efficiently in an online environment.

#### 1.2 Statement of Scope
  - This software will allow users to create, update, delete, and manage tasks through a web-based interface. Users will be able to categorize tasks, set priorities, assign deadlines, and mark tasks as completed. 
    Additionally, users can view upcoming tasks and filter tasks based on category or priority, enabling them to efficiently track progress and manage their workload.

#### 1.3 Software Context
  - This software is intended for individuals and small business to keep track of personal tasks and larger projects.

#### 1.4 Major Constraints
  - The development of this software is constrained by limited resources, as it is a zero-profit, zero-funded project. The software must be developed using open-source or free tools. The software should be lightweight to minimize hosting and infrastructure costs.

---

### 2.0 Usage Scenario

#### 2.1 User Profiles
- **Regular User**
   - Can create, update, delete, and manage tasks.
   - Can organize tasks into categories and set priorities or deadlines.
   - Can view tasks in a list or calendar view, and mark tasks as completed.
- **Admin User**
   - Has all the capabilities of a regular user.
   - Can manage user accounts (e.g., creating, deleting, and assigning roles to users).
   - Can access system settings, such as configuring the self-hosted or cloud deployment options.
- **Business Owner/Manager**
   - For the business version of the system, a business owner or manager could have access to team-level task management, assigning tasks to employees, and viewing overall project progress.

#### 2.2 Use-Cases
- **Create Task**
   - The user can create a new task by providing a title, category, priority level, and deadline.
  
- **Edit Task**
   - The user can modify an existing task’s details (title, category, priority, or deadline).
  
- **Delete Task**
   - The user can remove a task from their task list.
  
- **Mark Task as Completed**
   - The user can mark a task as completed.
  
- **View Task List**
   - The user can view a list of all tasks, with the ability to filter by category, priority, or deadline.

#### 2.3 Special Usage Considerations


   - The software should be accessible through modern web browsers on desktop devices.
   - It should be simple to use with minimal setup required.
   - The system should allow for basic functionality with no need for extensive documentation or training.

### 3.0 Data Model and Description

#### 3.1 Data Description
   - **Task Data**
      - Each task will contain a title, description, category, priority level, deadline, and completion status.
   - **User Data**
      - Users will have a username, password, role, and contact information. 

##### 3.1.1 Data Objects
###### Data Base
---
- **Users Table**
  - `user_id` (Primary Key)
  - `username`
  - `password`
  - `role_id` (Foreign Key)

- **Roles Table**
  - `role_id` (Primary Key)
  - `role_name` (e.g., Admin, Regular User)

- **Tasks Table**
  - `task_id` (Primary Key)
  - `user_id` (Foreign Key)
  - `title`
  - `description`
  - `category`
  - `priority`
  - `deadline`
  - `status`

- **Audit Table** 
  - `audit_id` (Primary Key)
  - `user_id` (Foreign Key)
  - `action` 
  - `timestamp`

- **Task History Table** 
  - `history_id` (Primary Key)
  - `task_id` (Foreign Key linking to the Tasks table)
  - `previous_status`
  - `new_status`
  - `change_timestamp`
    
  ###### API
---
- **Authentication API**
  - `POST /login`
  - `POST /logout`
  - `POST /register`

- **User Management API**
  - `GET /users`
  - `PUT /users/{user_id}`
  - `DELETE /users/{user_id}`

- **Task Management API**
  - `POST /tasks`
  - `GET /tasks`
  - `PUT /tasks/{task_id}`
  - `DELETE /tasks/{task_id}`

##### 3.1.2 Relationships
###### Primary Keys, Foreign Keys, Relationship Type, and Participation

1. **Users &rarr; Tasks**
   - **Primary Key**: `user_id` (Users) &rarr; **Foreign Key**: `user_id` (Tasks)
   - **Relationship Type**: One-to-Many
   - **Participation**: Optional for Users, Mandatory for Tasks

2. **Roles &rarr; Users**
   - **Primary Key**: `role_id` (Roles) &rarr; **Foreign Key**: `role_id` (Users)
   - **Relationship Type**: One-to-Many
   - **Participation**: Optional for Roles, Mandatory for Users

3. **Tasks &rarr; Task History** 
   - **Primary Key**: `task_id` (Tasks) &rarr; **Foreign Key**: `task_id` (Task History)
   - **Relationship Type**: One-to-Many
   - **Participation**: Optional for Tasks, Mandatory for Task History

4. **Users &rarr; Audit** 
   - **Primary Key**: `user_id` (Users) &rarr; **Foreign Key**: `user_id` (Audit)
   - **Relationship Type**: One-to-Many
   - **Participation**: Optional for Users, Mandatory for Audit


##### 3.1.3 Complete Data Model
![ERD Diagram](UML/Task%20Management%20Database%20Dark.png)
###### Light Version
[Task Management Database Light.png](UML/Task%20Management%20Database%20Light.png)

<!-- #TODO: Add 3.1.4 Data Dictionary -->
<!-- Provide a reference to the data dictionary (maintained electronically). -->

---

### 4.0 Functional Model and Description

- **User Authentication**:
  - Allows users to register, log in, and manage their account securely.

- **Task Management**:
  - Users can create, edit, view, and delete tasks.
  - Users can set deadlines, priorities, and categories.

- **Task History Tracking**:
  - Keeps track of changes to task status over time.

- **Audit Log**:
  - Monitors user actions for system accountability.

#### 4.2 Software Interface Description

- **External Machine Interfaces**:
  - The system will not interact with external hardware. All operations are self-contained within the local environment.

- **External System Interfaces**:
  - Interacts with the database for user authentication, task management, audit logs, and history tracking via API requests.

- **Human Interface**:
  - The user interacts with the web portal for task creation, editing, and management. The interface will include input forms, data views, and status updates.

---

### 5.0 Restrictions, Limitations, and Constraints

- **Budget Constraints**:
  - The project has zero funding, so only free or open-source tools and libraries will be used.

- **Hosting Constraints**:
  - Currently, only self-hosting is possible without funding.

- **Feature Scope**:
  - Due to time and resource limitations, only core functionality (task management, history tracking, audit) will be developed.
