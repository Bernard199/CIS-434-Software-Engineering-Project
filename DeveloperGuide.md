Introduction
------------

This guide is for developers working with the **Task Manager** codebase. It provides the necessary information to understand the architecture, setup, and contribution guidelines for the project.

Table of Contents
-----------------

1.  [Project Setup](#project-setup)
2.  [Code Structure](#code-structure)
3.  [Running the Project](#running-the-project)
4.  [API Integration](#api-integration)
5.  [Testing](#testing)
6.  [Contributing](#contributing)
7.  [Troubleshooting](#troubleshooting)

Project Setup
-------------

### Prerequisites

*   Node.js >= v14
*   npm or yarn
*   A code editor (VSCode recommended)

### Installing Dependencies

Clone the repository and navigate to the project folder:

    git clone https://github.com/Bernard199/CIS-434-Software-Engineering-Project.git
    cd task-manager
    npm install

### Running the Development Server

To start the development server, run:

    npm run dev

This will launch the application at [http://localhost:3000](http://localhost:3000).

Code Structure
--------------

### Frontend

The frontend of the application is built with **Next.js** and **React**. The main directories are:

*   **pages**: Contains the route files for the app.
*   **components**: Reusable components for UI elements like buttons, forms, and modals.
*   **styles**: Global and component-specific styles (using Tailwind CSS).

### Backend (API)

The backend is powered by **Prisma** and **PostgreSQL**. The main components are:

*   **app**: Contains the Prisma app and all routes.
*   **models**: Database models for tasks and users.
*   **services**: Business logic related to tasks and users.

### State Management

State is managed through **React's `useState`** and **Context API** for global state management.

Running the Project Locally
---------------------------

### Frontend

Ensure the frontend dependencies are installed using `npm install`.

    npm run dev

### Backend

Set up the Prisma server using npm.
* Install Prisma
  
      npm install prisma
  
* Invoke the Prisma CLI
  
      npx prisma
  
* Set up your Prisma ORM project by creating your Prisma schema file template
  
      npx prisma init

API Integration
---------------

The frontend communicates with the backend via the API, using Axios for HTTP requests. The key API endpoints are:

*   **GET /tasks/**: Fetch all tasks.
*   **POST /tasks/**: Create a new task.
*   **PUT /tasks/{id}**: Update an existing task.
*   **DELETE /tasks/{id}**: Delete a task.

API requests include authorization headers for authentication via JWT tokens.

Testing
-------

To run tests, you need to have both the frontend and backend services running.

### Frontend

Run the tests using Jest:

    npm test

### Backend

Use `Prisma Studio` for testing API endpoints:

[https://www.prisma.io/studio](https://www.prisma.io/studio).     

Contributing
------------

We welcome contributions! To contribute:

1.  Fork the repository.
2.  Create a new branch.
3.  Make your changes and test thoroughly.
4.  Create a pull request with a detailed explanation of your changes.

Please follow best practice and use common sense.

Troubleshooting
---------------

### Common Issues

*   **Dependencies Not Installing**: Ensure that you are using the correct version of Node.js and Python. Clear npm cache if necessary.
*   **Server Not Starting**: Check that all environment variables are set correctly.
*   **API Issues**: Ensure that the backend server is running and that API endpoints are reachable.
