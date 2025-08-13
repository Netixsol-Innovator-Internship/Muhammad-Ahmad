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
  const handleAddTask = async (taskData) => {
    if (!taskData.title.trim()) return;
    setLoading(true);
    setError("");
    try {
      await api.post("/tasks", taskData);
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
      await api.put(`/tasks/${id}`, { completed });
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

  // Edit a task
  const handleEditTask = async (id, updatedData) => {
    setLoading(true);
    setError("");
    try {
      await api.put(`/tasks/${id}`, updatedData);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 text-center sm:text-left">
          Task Dashboard
        </h1>

        {/* Task Form Component */}
        <TaskForm onAdd={handleAddTask} />

        {/* Loading & Error Messages */}
        {loading && <p className="text-blue-500 mb-4 text-center">Loading...</p>}
        {error && <p className="text-red-500 mb-4 text-center bg-red-50 p-3 rounded">{error}</p>}

        {/* Task List Component */}
        <TaskList 
          tasks={tasks}
          onToggle={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  );
}
