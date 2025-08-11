# Week 3 - Day 1

## Overview
This is a simple RESTful API for managing daily tasks. You can create, read, update, and delete tasks. The API is built with Node.js and Express, and includes Swagger documentation at `/api-docs`.

## Features
- Get all tasks
- Get a specific task by ID
- Create a new task
- Update an existing task
- Delete a task

## Steps to Run the Project
1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Start the server:**
	 ```bash
	 node server.js
	 ```
3. **Access API docs:**
	 Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser for interactive documentation.

## API Endpoints & Sample Formats

### Get All Tasks
**Request:**
```
GET /api/tasks
```
**Response:**
```json
{
	"success": true,
	"data": [
		{ "id": 1, "title": "Learn Node.js", "completed": false },
		{ "id": 2, "title": "Build an API", "completed": false }
	],
	"message": "Here are all your tasks"
}
```

### Get Task by ID
**Request:**
```
GET /api/tasks/1
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 1, "title": "Learn Node.js", "completed": false },
	"message": "Here's your task 1"
}
```

### Create a New Task
**Request:**
```
POST /api/tasks
Content-Type: application/json
{
	"title": "Buy groceries",
	"completed": false
}
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 3, "title": "Buy groceries", "completed": false },
	"message": "Task created successfully"
}
```

### Update a Task
**Request:**
```
PUT /api/tasks/1
Content-Type: application/json
{
	"title": "Learn Node.js and Express",
	"completed": true
}
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 1, "title": "Learn Node.js and Express", "completed": true },
	"message": "Task updated successfully"
}
```

### Delete a Task
**Request:**
```
DELETE /api/tasks/1
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 1, "title": "Learn Node.js", "completed": false },
	"message": "Task deleted successfuly"
}
```

---
For more details, see the Swagger docs at `/api-docs`.
