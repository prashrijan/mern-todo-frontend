// src/components/TasksBreakdown.js
import React from "react";
import TaskItem from "./TaskItem";

const TasksBreakdown = ({ tasks, changeStatus, handleDelete }) => {
  return (
    <div className="w-full md:w-full p-12 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Tasks</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            changeStatus={changeStatus}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-gray-500">No tasks available</p>
      )}
    </div>
  );
};

export default TasksBreakdown;
