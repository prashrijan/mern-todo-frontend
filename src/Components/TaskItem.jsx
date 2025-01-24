import { useState } from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const TaskItem = ({ task, changeStatus, handleDelete }) => {
  const [status, setStatus] = useState(task.status || "pending");
  const handleStatusChange = (e, id) => {
    setStatus(e.target.value);

    changeStatus(id, e.target.value);
  };

  const statusColors = {
    pending: "bg-red-400",
    "in-progress": "bg-yellow-400",
    completed: "bg-green-400",
  };

  return (
    <div
      className={`p-4 border border-gray-300 rounded-md shadow-md mb-4 ${statusColors[status]}`}
    >
      <div className="flex justify-between items-center text-white text-lg">
        <h3 className="font-semibold">{capitalizeFirstLetter(task.task)}</h3>

        {/* Delete Icon */}
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 hover:cursor-pointer"
        >
          🗑️
        </button>
      </div>

      <div className="mt-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e, task._id)}
          className="p-2 border rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
