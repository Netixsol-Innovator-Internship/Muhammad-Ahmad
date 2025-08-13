const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// all routes below are protected
router.use(auth);

// GET /api/tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks
router.post("/", async (req, res, next) => {
  try {
    const { title, description = "" } = req.body || {};
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      title,
      description,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { title, description, completed } = req.body || {};
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
