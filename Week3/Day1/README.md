# Week 3 - Day 1

## 1. NavBar
**Task Summary:**
Simple responsive navigation bar for a web page.

**Implementation Details:**
- Built with HTML, CSS, and JavaScript.
- Includes basic navigation links and styling.
- Demonstrates layout and interactivity for web navigation.

### Live Preview:
**Preview**: [ahmad-week3-day1-navbar.vercel.app](https://ahmad-week3-day1-navbar.vercel.app/)

## 2. TaskManagerAPI
**Task Summary:**
RESTful API for managing daily tasks (CRUD operations).

**Implementation Details:**
- Built with Node.js and Express.
- Endpoints for creating, reading, updating, and deleting tasks.
- Includes Swagger documentation at `/api-docs`.
- To run: `npm install` then `node server.js`.
```
**Example Response:**
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

## Live Preview:
Preview: [ahmad-week3-day1-api-docs.vercel.app](https://ahmad-week3-day1-api-docs.vercel.app/api-docs)
