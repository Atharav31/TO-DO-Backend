# Task Management API

This is a simple Task Management API built with Express.js. It allows for managing tasks with features such as creating, updating, deleting, and retrieving tasks. The API includes authentication and authorization for user roles.

## Features

- **Authentication:** Secure the API using an API key for access.
- **Authorization:** Only users with an "admin" role can update or delete tasks.
- **Task Operations:**
  - Create a task
  - View all tasks
  - View a task by ID
  - Update a task
  - Delete a task
- **Validation:** Ensure that tasks have a title and description.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Atharav31/ToDo--backend-.git
   cd <project-directory>
   ```

   Install dependencies:

```bash
npm install

Create a .env file in the root of the project with the following content:

```

API_KEY=your-api-key-here
PORT=3000
Replace your-api-key-here with the actual API key you want to use for authentication.

## Start the server:

```bash
npm start
```

The server will start running on the port specified in the .env file.

# API Endpoints

### POST /tasks

Create a new task. Requires authentication and validation for title and description.

Request Body:

```bash
{
 "title": "Task Title",
 "description": "Task Description"
}
```

Response:

```bash
{
 "newtask": {
   "id": 0,
   "title": "Task Title",
   "description": "Task Description"
 },
 "message": "Task created successfully"
}
```

### GET /tasks

Retrieve all tasks. Requires authentication.

Response:

```bash
[
 {
   "id": 0,
   "title": "Task Title",
   "description": "Task Description"
 }
]
```

### GET /tasks/:id

Retrieve a task by ID. Requires authentication.

Response:

```bash
{
 "task": {
   "id": 0,
   "title": "Task Title",
   "description": "Task Description"
 },
 "message": "Task found successfully"
}
```

### PUT /tasks/:id

Update an existing task. Requires authentication, authorization (admin role), and validation for title and description.

Request Body:

```bash
{
 "title": "Updated Task Title",
 "description": "Updated Task Description"
}
```

Response:

```bash
{
 "task": {
   "id": 0,
   "title": "Updated Task Title",
   "description": "Updated Task Description"
 },
 "message": "Task updated successfully"
}
```

### DELETE /tasks/:id

Delete a task. Requires authentication and authorization (admin role).

Response:

```bash
{
 "tasks": [
   {
     "id": 0,
     "title": "Task Title",
     "description": "Task Description"
   }
 ],
 "message": "Task deleted successfully"
}
```

## Middleware

Authentication (authenticate): This middleware checks for a valid API key in the Authorization header. The key is compared with the value stored in the .env file. If the key matches, the user is authenticated.

Authorization (authorization): This middleware ensures that only users with an admin role can access certain endpoints (e.g., update and delete tasks).

Task Validation (validateTask): This middleware checks that the request body contains both title and description. If any of these are missing, the request is rejected with a 400 Bad Request status.

## Testing on Postman

To test the API using Postman, you must include the API key in the Authorization header for all requests (except when the API key is not required, like when the task creation or deletion is not protected by the role).

Example header for authentication:
In Postman, when sending requests, add the following header:

Key: Authorization
Value: Bearer your-api-key-here
Replace your-api-key-here with the actual API key specified in your .env file.

## Error Handling

If any error occurs during the request lifecycle, the API will return a 500 Internal Server Error response with a generic error message:

```bash
{
 "message": "Something went wrong"
}
```

License
This project is licensed under the ISC License.
