import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

// In-memory storage for Vercel deployment
// Note: Data will be lost on each deployment/restart
let tasks: Task[] = [];

const router = Router();

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
router.post('/', (req, res) => {
  // Request body must be JSON and not empty
  if (!req.is('application/json') || !req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body must be non-empty JSON' });
  }
  const { title, description, completed } = req.body;
  // Title validation
  if (!title || typeof title !== 'string' || title.trim().length < 1 || title.trim().length > 100) {
    return res.status(400).json({ error: 'Title is required, must be a string, and 1-100 characters long' });
  }
  // Description validation
  if (description && (typeof description !== 'string' || description.length > 500)) {
    return res.status(400).json({ error: 'Description must be a string and max 500 characters' });
  }
  // Completed field type check
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean if provided' });
  }
  const task: Task = {
    id: uuidv4(),
    title: title.trim(),
    description: description ? String(description) : undefined,
    completed: typeof completed === 'boolean' ? completed : false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  // Request body must be JSON and not empty
  if (!req.is('application/json') || !req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body must be non-empty JSON' });
  }
  const { id } = req.params;
  const { completed, title, description } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'task not found' });
  // Title validation
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 1 || title.trim().length > 100) {
      return res.status(400).json({ error: 'Title must be a string and 1-100 characters long' });
    }
    task.title = title.trim();
  }
  // Description validation
  if (description !== undefined) {
    if (typeof description !== 'string' || description.length > 500) {
      return res.status(400).json({ error: 'Description must be a string and max 500 characters' });
    }
    task.description = description;
  }
  // Completed field type check
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean' });
    }
    task.completed = completed;
  }
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'task not found' });
  tasks.splice(idx, 1);
  res.status(204).end();
});

export default router;
