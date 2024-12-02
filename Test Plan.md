# Test Specification

## 1.0 Introduction

### 1.1 Goals and Objectives
The goal of this test plan is to ensure the software meets its functional, usability, and security requirements by systematically identifying and addressing issues through manual testing.

### 1.2 Statement of Scope
This test plan focuses on core manual testing of the system's essential functionalities, including user authentication, form validation, restricted access controls, and basic UI responsiveness and accessibility. File upload functionality is excluded as it is a low-priority feature that has not been implemented.

- **Features/Functionality/Behavior to be tested**:  
  - User authentication (valid and invalid credentials).  
  - Access controls for restricted content.  
  - Form validation for mandatory fields.  
  - UI responsiveness and usability.  
  - Security against input attacks.  
- **Features/Functionality/Behavior not to be tested**:  
  - File upload functionality.  
  - Advanced or non-core features not implemented in this release.  
  - Performance testing and scalability for large user bases.  

---

## 2.0 Test Plan

### 2.1 Software to be Tested
The software being tested is the Task Management System, focusing on its core functionalities. Exclusions include premium features and file upload functionality.

### 2.3 Testing Tools and Environment
The testing approach is entirely manual and uses the following environment:
- **Database**: PostgreSQL database.  
- **Environment**: Local development server running on Linux.  
- **Resources**: Test accounts for different user roles, sample datasets, and simple pre-defined test scripts for manual execution.

### 2.4 Test Schedule
The manual testing schedule is as follows:
- **Week 1**: Feature validation and exploratory testing of individual components.  
- **Week 2**: Integration testing to verify seamless interaction between components.  
- **Week 3**: End-to-end system testing and user acceptance testing.  
- **Week 4**: Bug fixes and re-validation of key functionalities.

---

## 3.0 Test Cases

### Functional Test Cases

| **ID**  | **Test Input**                                           | **Expected Output**                                     | **Description**                                                   |
|---------|----------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------|
| TC01    | User enters valid login credentials                      | System grants access and navigates to dashboard         | Tests the login functionality with valid inputs.                 |
| TC02    | User enters invalid login credentials                    | System denies access and displays an error message      | Tests the login functionality with invalid inputs.               |
| TC03    | User attempts to access restricted content without login | System redirects to login page                          | Ensures unauthenticated users cannot access restricted content.  |
| TC04    | User submits a form with missing mandatory fields        | System highlights the missing fields and displays an error | Tests form validation for mandatory fields.                      |
| TC05    | User logs in, navigates to a page, and remains idle      | System automatically logs out after a session timeout   | Verifies session timeout functionality for idle users.           |
| TC06    | User logs in on multiple devices simultaneously          | System handles simultaneous logins appropriately        | Tests handling of concurrent sessions.                           |
| TC07    | User navigates to a non-existent URL                     | System displays a custom 404 error page                 | Ensures proper handling of invalid URLs.                         |
| TC08    | Server crashes during an operation                       | System gracefully handles the error and displays a maintenance message | Validates system stability under unexpected failures.            |

### UI Test Cases

| **ID**  | **Test Input**                                           | **Expected Output**                                     | **Description**                                                   |
|---------|----------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------|
| UI01    | Resize browser window to various sizes                   | UI components adjust layout to maintain usability       | Tests UI responsiveness to different screen sizes.               |
| UI02    | Use tab key to navigate through form fields              | Focus moves in logical order and highlights active fields | Tests keyboard navigation for accessibility.                     |
| UI03    | Open dashboard on various browsers (Chrome, Firefox)     | Dashboard displays consistently without visual glitches | Tests cross-browser compatibility.                               |
| UI04    | Attempt to submit a form with valid inputs               | Form submits successfully and displays success message  | Verifies form submission workflow and UI feedback.               |
| UI05    | Switch application language to another supported language | UI updates to the selected language without breaking layout | Ensures proper localization of the UI.                           |
| UI06    | View the application in high-contrast mode               | UI remains usable and adheres to accessibility standards | Tests accessibility for users with visual impairments.           |
| UI07    | Access the system on a mobile device                     | UI adapts to mobile screen sizes, maintaining usability  | Tests mobile responsiveness and usability.                       |

### Security Test Cases

| **ID**  | **Test Input**                                           | **Expected Output**                                     | **Description**                                                   |
|---------|----------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------|
| SEC01   | Enter script tags (`<script>alert('test');</script>`) into input fields | System rejects input and sanitizes it                  | Validates security against XSS attacks.                          |
| SEC02   | Enter SQL code (`' OR '1'='1`) into input fields          | System rejects the input and logs the attempt           | Ensures protection against SQL injection vulnerabilities.         |

### Usability Test Cases

| **ID**  | **Test Input**                                           | **Expected Output**                                     | **Description**                                                   |
|---------|----------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------|
| US01    | Submit invalid inputs across different forms             | System displays clear and actionable error messages     | Verifies the usability of error messages for users.               |
| US02    | Navigate through the registration and first-use experience | User receives sufficient guidance for setup            | Evaluates the onboarding experience for new users.                |

