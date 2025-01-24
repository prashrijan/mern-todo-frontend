import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import TasksBreakdown from "../Components/TasksBreakdown";

const Dashboard = ({
  fetchTasks,
  tasks,
  changeStatus,
  handleLogout,
  handleDelete,
}) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} />

      <div className="flex-1 p-4">
        <TasksBreakdown
          tasks={tasks}
          changeStatus={changeStatus}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
