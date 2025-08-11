// Import express
const express = require('express');

const app = express();
const port = 3000;

// Tell express to understand JSON data
app.use(express.json());

let tasks = [
	{ id: 1, title: "Learn Node.js", completed: false },
	{ id: 2, title: "Build an API", completed: false }
];

// keep track of the next ID number to use
let nextId = 3;

// GET all tasks
app.get('/api/tasks', (req, res) => {
	res.status(200).json({
		success: true,
		data: tasks,
		message: "Here are all your tasks"
	});
});

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
