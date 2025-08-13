import { useState, useEffect } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tasks from backendy
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (title) => {
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      await api.post("/tasks", { title });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (id, completed) => {
    setLoading(true);
    setError("");
    try {
      await api.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      {/* Task Form Component */}
      <TaskForm onAdd={handleAddTask} />

      {/* Loading & Error Messages */}
      {loading && <p className="text-blue-500 mb-2">Loading...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Task List Component */}
      <TaskList 
        tasks={tasks}
        onToggle={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
