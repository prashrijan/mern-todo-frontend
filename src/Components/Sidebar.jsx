import React from "react";
import { Link } from "react-router-dom";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const Sidebar = ({ user, onLogout }) => {
  return (
    <div className="w-[20%] bg-gray-800 text-white h-screen p-6 flex flex-col">
      <h2 className="text-[2rem] font-semibold mb-4">
        Hello 👋,
        <br />
        {capitalizeFirstLetter(user.userName)}
      </h2>
      <ul className="space-y-4 mt-10 text-lg">
        <li>
          <Link to="/dashboard" className="hover:text-blue-300">
            Your Tasks
          </Link>
        </li>
        <li>
          <Link to="/create-task" className="hover:text-blue-300">
            Create Tasks
          </Link>
        </li>
      </ul>
      <button
        className="mt-20 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
