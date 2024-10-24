# Software Design Specification (SDS)

## Task Management Software  
*Team: Chase Ivanicic, Bernard Schweter*

---

### 1.0 Introduction

#### 1.1 Goals and Objectives
The primary goal of the software is to deliver a lightweight, easy-to-use task management tool that can be accessed through a web portal. The software aims to:
- Provide users with a web-based platform to create, update, delete, and manage tasks effectively.
- Ensure high responsiveness, with task views loading in under 2 seconds for up to 100 tasks.
- Design a scalable and modular architecture that can accommodate future enhancements such as task delegation.

#### 1.2 Statement of Scope
The software will offer a web-based interface that allows users to manage their tasks, including creating, updating, and deleting tasks. Users can categorize tasks, set deadlines, assign priorities, and view upcoming tasks. Core features include:
- **Task Management**: Creating, viewing, editing, and deleting tasks.
- **Task Filtering**: Organizing tasks by categories or priorities.
- **User Authentication**: Secure login, registration, and user role management.

#### 1.3 Software Context
The software is intended for individual users and small businesses to manage personal tasks and projects. It will be developed using open-source technologies and hosted on Microsoft Azure, provided by Cleveland State University. The system aims to handle up to 10 concurrent users without performance degradation.

#### 1.4 Major Constraints
The software development is constrained by:
- **Budget Limitations**: Only free or open-source tools and libraries will be used.
- **Hosting Limitations**: The software will be hosted on Microsoft Azure, affecting development flexibility.
- **Performance Requirements**: The system must support up to 100 tasks per user and up to 10 concurrent users without noticeable performance drops.

---

### 2.0 Data Design

#### 2.1 Data Structures
- **Task Structure**: Each task will have attributes such as `title`, `description`, `category`, `priority`, `deadline`, and `status`.
- **User Structure**: Users will have attributes like `user_id`, `username`, `password`, `role`, and `contact_info`.
- **Role Structure**: Defines user roles (e.g., Admin, Regular User).

#### 2.2 Database Description
The database will consist of multiple tables:
- **Users Table**: Stores user information with columns `user_id`, `username`, `password`, `role_id`.
- **Roles Table**: Defines roles, including `role_id` and `role_name`.
- **Tasks Table**: Contains task details such as `task_id`, `user_id`, `title`, `category`, `priority`, `deadline`, and `status`.
- **Audit Table**: Logs user actions, including `audit_id`, `user_id`, `action`, and `timestamp`.
- **Task History Table**: Tracks changes in task status with columns `history_id`, `task_id`, `previous_status`, `new_status`, and `change_timestamp`.

The data design will follow relational database principles with indexed columns for optimized performance in task queries.

---

### 3.0 Architectural and Component-Level Design

#### 3.1 Architecture Diagrams
The system will adopt a three-layer architecture:
- **Presentation Layer**: Web-based front end for user interaction.
- **Logic Layer**: Contains core functionality, such as task management, filtering, and authentication.
- **Data Access Layer**: Interfaces with the database, handling data storage and retrieval.

#### 3.2 Description for Components
- **User Management Component**: Handles user authentication and role management. It interacts with the `Users` and `Roles` tables.
- **Task Management Component**: Manages task creation, updating, and deletion. Interfaces with the `Tasks` table and the `Task History` for tracking changes.
- **Audit Component**: Logs user activities to the `Audit` table for accountability.
- **Task Filtering Component**: Supports viewing tasks based on categories or priorities, optimizing query performance.

#### 3.3 External Interface Description
- **APIs**:
  - **Authentication API**: Manages user login, logout, and registration.
  - **Task Management API**: CRUD operations for tasks.
  - **User Management API**: Admin operations for user accounts.
- **External Systems**: The software is self-contained, with no external system dependencies except for the Azure hosting environment.

---

### 4.0 User Interface Design

#### 4.1 Description of the User Interface
The user interface will feature:
- **Task List View**: Displays tasks in a list format with filtering options.
- **Task Details Form**: For creating or editing tasks, with fields for title, description, category, priority, and deadline.
- **User Dashboard**: Displays an overview of tasks, upcoming deadlines, and completed tasks.
- **Admin Dashboard**: Allows admin users to manage user accounts and system settings.

#### 4.2 Interface Design Rules
- **Consistency**: All forms and views will follow a consistent layout and design language.
- **Responsiveness**: The interface must load within 2 seconds for typical user interactions under normal network conditions.
- **Accessibility**: The design will follow accessibility standards to ensure usability by people with disabilities.

---

### 5.0 Restrictions, Limitations, and Constraints
- **Resource Limitations**: The system will only support up to 10 concurrent users and less than 100 tasks per user, given current resource constraints.
- **Hosting Requirements**: Deployment is limited to the Microsoft Azure platform.
- **Budget Constraints**: Open-source or free tools will be used exclusively to avoid fees.

---

### 6.0 Appendices

#### 6.1 Requirements Traceability Matrix
| Requirement                        | Design Element                  |
|------------------------------------|---------------------------------|
| Task Creation                      | Task Management Component       |
| User Authentication                | User Management Component       |
| Task Filtering                     | Task Filtering Component        |
| Audit Logging                      | Audit Component                 |

#### 6.2 Implementation Issues
- **Database Optimization**: Indexing and query optimization will be required to meet the performance targets.
- **Scalability Considerations**: Future upgrades may involve adding more server capacity or migrating to a differnt cloud platform.
