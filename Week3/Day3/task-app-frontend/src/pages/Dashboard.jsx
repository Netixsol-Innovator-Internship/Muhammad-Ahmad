import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Task Dashboard
          </h1>
          <Link
            to="/settings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>

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
