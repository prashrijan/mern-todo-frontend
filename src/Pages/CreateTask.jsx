import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";

const CreateTask = ({ fetchTasks, handleLogout }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const endPoint = import.meta.env.VITE_ENDPOINT;

  const [task, setTask] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task) {
      toast.error("Task description is required.", {
        autoClose: 1500,
      });
      return;
    }

    const newTask = {
      task,
      status,
    };

    axios
      .post(`${endPoint}/api/v1/tasks/add`, newTask, {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("accessToken"))}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Task created successfully.", {
            autoClose: 1500,
          });
          fetchTasks();
          setTask("");
          setStatus("pending");
        }
      })
      .catch((err) => {
        toast.error("An error occurred. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="flex-1 p-6 flex justify-center items-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Create Task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="task"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Description
              </label>
              <input
                type="text"
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter task description"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Task
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4 text-md">
            ✨ Keep going! You're one step closer to accomplishing your goals.
            Every task you create brings you closer to success! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
