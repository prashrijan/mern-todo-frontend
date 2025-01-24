import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = ({ registerUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userName.trim(),
      email: email.trim(),
      password,
    };
    registerUser(newUser);

    setEmail("");
    setPassword("");
    setUserName("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 md:p-0">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome to TaskMaster!
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Stay organized and boost your productivity by managing your to-do
          lists all in one place.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter a strong password"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-7 flex items-center justify-center text-gray-400 hover:text-gray-200"
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C5 3 1.73 7.11.46 10.16a1 1 0 000 .68C1.73 12.89 5 17 10 17s8.27-4.11 9.54-7.16a1 1 0 000-.68C18.27 7.11 15 3 10 3zM10 15c-3.28 0-6.07-3.11-7.25-5C3.93 8.11 6.72 5 10 5s6.07 3.11 7.25 5c-1.18 1.89-3.97 5-7.25 5zm0-7a3 3 0 100 6 3 3 0 000-6z" />
                  <path d="M10 9a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3.94 3.94a1 1 0 010-1.41 1 1 0 011.41 0L18.36 15.54a1 1 0 010 1.41 1 1 0 01-1.41 0L3.94 3.94z" />
                  <path d="M5.8 5.8C4.18 7.1 3.04 8.93 2.46 10.16a1 1 0 000 .68C3.73 12.89 7 17 12 17c1.7 0 3.27-.44 4.61-1.19L5.8 5.8zM12 15c-3.28 0-6.07-3.11-7.25-5C5.93 8.11 8.72 5 12 5c1.15 0 2.23.23 3.23.64L12.71 8.16a3 3 0 00-4.42 4.42l-1.41 1.41A7.91 7.91 0 0112 15z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
