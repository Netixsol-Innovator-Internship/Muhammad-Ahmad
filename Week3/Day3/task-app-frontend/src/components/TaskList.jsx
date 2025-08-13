export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <p className="text-gray-500 text-center py-6">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-center justify-between bg-white shadow rounded p-3"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task._id, !task.completed)}
              className="mr-3 h-5 w-5 text-blue-600"
            />
            <span
              className={`${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </span>
          </div>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
