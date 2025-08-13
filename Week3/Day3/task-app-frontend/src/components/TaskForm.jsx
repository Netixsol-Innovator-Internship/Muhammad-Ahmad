import { useState } from "react";

const TITLE_LIMIT = 100;
const DESCRIPTION_LIMIT = 500;

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  function validateInput() {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length > TITLE_LIMIT) {
      newErrors.title = `Title must be ${TITLE_LIMIT} characters or less`;
    }
    
    if (description.length > DESCRIPTION_LIMIT) {
      newErrors.description = `Description must be ${DESCRIPTION_LIMIT} characters or less`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateInput()) return;
    
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
    setErrors({});
  }

  function handleTitleChange(e) {
    const value = e.target.value;
    setTitle(value);
    if (errors.title && value.trim() && value.length <= TITLE_LIMIT) {
      setErrors(prev => ({ ...prev, title: "" }));
    }
  }

  function handleDescriptionChange(e) {
    const value = e.target.value;
    setDescription(value);
    if (errors.description && value.length <= DESCRIPTION_LIMIT) {
      setErrors(prev => ({ ...prev, description: "" }));
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${title.length > TITLE_LIMIT * 0.8 ? 'text-orange-500' : 'text-gray-400'}`}>
              {title.length}/{TITLE_LIMIT}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter task title"
            className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={TITLE_LIMIT}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <span className={`text-xs ${description.length > DESCRIPTION_LIMIT * 0.8 ? 'text-orange-500' : 'text-gray-400'}`}>
              {description.length}/{DESCRIPTION_LIMIT}
            </span>
          </div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter task description (optional)"
            className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 sm:h-24 resize-none text-sm sm:text-base ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            maxLength={DESCRIPTION_LIMIT}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).some(key => errors[key])}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 sm:py-3 rounded-md shadow transition-colors text-sm sm:text-base font-medium"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
