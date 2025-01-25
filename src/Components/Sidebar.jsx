import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import Menu and Cross (X) icons
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const Sidebar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Menu button for mobile */}
      <button
        className="block md:hidden p-2 text-red-500 fixed top-4 left-4 z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-10 h-screen bg-gray-800 text-white px-14  py-12 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:block md:w-[20%] w-[85%]`}
      >
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

      {/* Overlay for mobile when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
