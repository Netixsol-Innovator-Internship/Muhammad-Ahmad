// Import express
const express = require('express');

// Import Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Tell express to understand JSON data
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Task Manager API', 
      version: '1.0.0',
      description: 'A simple API to manage your daily tasks. You can create, read, update, and delete tasks.', // A helpful description
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Set up the documentation webpage at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let tasks = [
	{ id: 1, title: "Learn Node.js", completed: false },
	{ id: 2, title: "Build an API", completed: false }
];

// keep track of the next ID number to use
let nextId = 3;

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves a list of all tasks in the system.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Successfully retrieved all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Learn Node.js"
 *                       completed:
 *                         type: boolean
 *                         example: false
 *                 message:
 *                   type: string
 *                   example: "Here are all your tasks"
 */
// GET all tasks
app.get('/api/tasks', (req, res) => {
	res.status(200).json({
		success: true,
		data: tasks,
		message: "Here are all your tasks"
	});
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     description: Retrieves one specific task using its ID number. Like asking "show me task number 5 from my list"
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task you want to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully found and retrieved the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Learn Node.js"
 *                     completed:
 *                       type: boolean
 *                       example: false
 *                 message:
 *                   type: string
 *                   example: "Here's your task"
 *       404:
 *         description: Task not found - the ID doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: null
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 */
// GET specific task
app.get("/api/tasks/:id", (req, res) => {
	const id = parseInt(req.params.id);

	let task = tasks.find(task => task.id == id);

	if (!task) {
		res.status(404).json({
			success: false,
			data: null,
			message: "Invalid Task ID"
		});
	}

	res.status(200).json({
		success: true,
		data: task,
		message: `Here's your task ${id}`
	});
})

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to your to-do list. Like writing a new item on your notepad.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       description: The task information you want to create
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: What the task is about
 *                 example: "Buy groceries"
 *               completed:
 *                 type: boolean
 *                 description: Whether the task is already done (optional, defaults to false)
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     title:
 *                       type: string
 *                       example: "Buy groceries"
 *                     completed:
 *                       type: boolean
 *                       example: false
 *                 message:
 *                   type: string
 *                   example: "Task created successfully"
 *       400:
 *         description: Bad request - missing required information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: null
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "Title is required"
 */
// Create a new task
app.post("/api/tasks", (req, res) => {

	const { title, completed } = req.body;

	if (!title) {
		res.status(404).json({
			success: false,
			data: null,
			message: "Title is required"
		})
	}

	// Create the new task
	const newTask = {
		id: nextId++, // Use the next available ID
		title: title,
		completed: completed || false // Default to false if not provided
	};

	tasks.push(newTask);

	// Send success message
	res.status(201).json({
		success: true,
		data: newTask,
		message: "Task created successfully"
	});

})

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: Modify a task that's already in list task list.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task you want to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       description: The updated task information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title for the task (optional)
 *                 example: "Buy groceries and cook dinner"
 *               completed:
 *                 type: boolean
 *                 description: New completion status (optional)
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
// Update task of given id
app.put("/api/tasks/:id", (req, res) => {
	const id = parseInt(req.params.id);

	const { title, completed } = req.body;

	const taskIndex = tasks.findIndex(task => task.id == id);

	if (taskIndex == -1) {
		res.status(404).json({
			success: false,
			data: null,
			message: "Task not found"
		});
	}

	if (title) tasks[taskIndex].title = title;
	if (completed) tasks[taskIndex].completed = completed;

	res.status(201).json({
		success: true,
		data: tasks[taskIndex],
		message: "Task updated successfully"
	});
})

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task from your list permanently.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task you want to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
// Delete task of given id
app.delete("/api/tasks/:id", (req, res) => {

	const id = parseInt(req.params.id);

	const taskIndex = tasks.findIndex(task => task.id == id);

	if (taskIndex == -1) {
		res.status(404).json({
			success: false,
			data: null,
			message: "Task not found"
		});
	}

	const task = tasks[taskIndex];

	tasks.splice(taskIndex, 1);

	res.status(200).json({
		success: true,
		data: task,
		message: "Task deleted successfuly"
	});
})


// Start the server (like opening your shop for business)
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
