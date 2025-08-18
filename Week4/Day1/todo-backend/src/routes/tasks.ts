import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';


interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}


const DATA_FILE = path.join(__dirname, '../../tasks.json');
let tasks: Task[] = [];

// Load tasks from file at startup
async function loadTasks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    tasks = JSON.parse(data);
  } catch (err) {
    tasks = [];
  }
}

// Save tasks to file
async function saveTasks() {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (err: any) {
    console.log(err.message);
  }
}

// Load tasks once at startup
loadTasks();

const router = Router();

// GET /api/tasks
router.get('/', async (req, res) => {
  // Always read latest from file in case of external changes
  await loadTasks();
  res.json(tasks);
});

// POST /api/tasks
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required and must be a string' });
  }

  const task: Task = {
    id: uuidv4(),
    title: title.trim(),
    description: description ? String(description) : undefined,
    completed: false,
  };

  tasks.push(task);
  await saveTasks();
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed, title, description } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'task not found' });

  if (typeof completed === 'boolean') task.completed = completed;
  if (typeof title === 'string') task.title = title.trim();
  if (description !== undefined) task.description = description;

  await saveTasks();
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'task not found' });
  tasks.splice(idx, 1);
  await saveTasks();
  res.status(204).end();
});

export default router;
