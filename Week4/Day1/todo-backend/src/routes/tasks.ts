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
let tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Sample Task",
    description: "This is a sample task for testing",
    completed: false
  }
];

const router = Router();

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
router.post('/', (req, res) => {
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
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title, description } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'task not found' });

  if (typeof completed === 'boolean') task.completed = completed;
  if (typeof title === 'string') task.title = title.trim();
  if (description !== undefined) task.description = description;

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
