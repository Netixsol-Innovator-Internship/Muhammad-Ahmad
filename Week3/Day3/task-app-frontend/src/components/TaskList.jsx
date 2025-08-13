import { useState } from "react";

const TITLE_LIMIT = 100;
const DESCRIPTION_LIMIT = 500;

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateEdit = () => {
    const newErrors = {};
    
    if (!editTitle.trim()) {
      newErrors.title = "Title is required";
    } else if (editTitle.length > TITLE_LIMIT) {
      newErrors.title = `Title must be ${TITLE_LIMIT} characters or less`;
    }
    
    if (editDescription.length > DESCRIPTION_LIMIT) {
      newErrors.description = `Description must be ${DESCRIPTION_LIMIT} characters or less`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setErrors({});
  };

  const handleSaveEdit = async (id) => {
    if (!validateEdit()) return;
    
    try {
      await onEdit(id, { title: editTitle.trim(), description: editDescription.trim() });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      setErrors({});
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setErrors({});
  };

  if (!tasks.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">
          No tasks yet. Create your first task above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-md rounded-lg p-4 sm:p-6 border hover:shadow-lg transition-shadow"
        >
          {editingId === task._id ? (
            // Edit mode
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-xs ${editTitle.length > TITLE_LIMIT * 0.8 ? 'text-orange-500' : 'text-gray-400'}`}>
                    {editTitle.length}/{TITLE_LIMIT}
                  </span>
                </div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength={TITLE_LIMIT}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <span className={`text-xs ${editDescription.length > DESCRIPTION_LIMIT * 0.8 ? 'text-orange-500' : 'text-gray-400'}`}>
                    {editDescription.length}/{DESCRIPTION_LIMIT}
                  </span>
                </div>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-20 resize-none text-sm sm:text-base ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Description (optional)"
                  maxLength={DESCRIPTION_LIMIT}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleSaveEdit(task._id)}
                  disabled={Object.keys(errors).some(key => errors[key])}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task._id, !task.completed)}
                    className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium text-sm sm:text-base break-words ${
                        task.completed ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        className={`text-xs sm:text-sm mt-1 break-words ${
                          task.completed ? "line-through text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 sm:space-x-3 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
