# Task Management API

This is a Node.js Express RESTful API for managing tasks with CRUD operations and input validation using the Joi library.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Validation](#validation)
- [Endpoints](#endpoints)

## Features

- Create, Read, Update, Delete tasks, get tasks based on priority, get tasks based on their status along with sort by date
- Input validation using Joi.
- RESTful API design.
- Express middleware for error handling and request parsing.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- Node version 18 or above

## Installation

1. Clone this repository

2. Install dependencies

```bash
npm install
```

3. Run Server

```bash
npm run dev
```

# Usage

You can browse the apis at <http://localhost:3000> using either in postman or curl or any api platform

# Validation

This project uses the Joi library for input validation. Validation schemas are defined in the helpers/taskValidator.js file and are used to validate incoming requests.

# Endpoints

<b>Get All Tasks</b>
Endpoint: /tasks
HTTP Method: GET
Query Params: date and completed are supported
Query param values:

- For date "asc" and "desc" are supported
- For completed values true and false are supported

Response: Returns an array of all tasks.

<b>Get a Task by ID</b>
Endpoint: /tasks/:id
HTTP Method: GET
Response: Returns the task with the specified ID.

<b>Get Task by priority</b>
Endpoint: /tasks/priority/:level
HTTP Method: GET

- Supported levels are "High, Medium and Low"

Response: Returns an array of tasks with the level of priority requested.

<b>Create a Task</b>
Endpoint: /tasks/
HTTP Method: POST
Request Body: Task object.
Response: Returns a succesfull message

<b>Update a Task</b>
Endpoint: /tasks/:id
HTTP Method: PUT
Request Body: Updated task object.
Response: Returns a succesfull message

<b>Delete a Task</b>
Endpoint: /tasks/:id
HTTP Method: DELETE
Response: null
