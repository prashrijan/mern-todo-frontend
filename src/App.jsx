import { useState } from "react";
import "./App.css";
import SignUp from "./Pages/SignUp";
import axios from "axios";
import Login from "./Pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../src/utils/Loader";

import CreateTask from "./Pages/CreateTask";

function App() {
  const [tasks, setTasks] = useState([]);
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const endPoint = import.meta.env.VITE_ENDPOINT;

  const registerUser = (user) => {
    axios
      .post(`${endPoint}/api/v1/users/register`, user)
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("Account created successfully.", {
            autoClose: 1500,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const loginUser = (user) => {
    setLoading(true);
    axios
      .post(`${endPoint}/api/v1/users/login`, user)
      .then((res) => {
        if (res.status == 201) {
          localStorage.setItem("loggedInUser", JSON.stringify(res.data?.data));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data?.accessToken)
          );
          setLoading(false);
          fetchTasks();
          setError("");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          setError("Incorrect email or password.");
          return;
        } else if (err.response && err.response.status === 400) {
          setError("User with this email doesnot exists.");
        } else {
          setError("An error occurred. Please try again.");
          return;
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("accessToken");
    setTasks([]);
    window.location.href = "/login";
    toast.success("Logged out successfully.", {
      autoClose: 1500,
    });
  };

  const fetchTasks = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (!accessToken) {
      console.error("No access token available!");
      return;
    }
    axios
      .get(`${endPoint}/api/v1/tasks`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.error(
          "Error fetching tasks:",
          err.response ? err.response.data : err.message
        );
      });
  };

  const changeStatus = (id, value) => {
    console.log(id, value);
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (!accessToken) {
      console.error("No access token available!");
      return;
    }
    axios
      .post(
        `${endPoint}/api/v1/tasks/status/${id}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Status updated successfully.", {
          autoClose: 1500,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));

    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (!accessToken) {
      console.error("No access token available!");
      return;
    }

    axios
      .delete(`${endPoint}/api/v1/tasks/delete/${id}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((res) => {
        fetchTasks();
        toast.success("Task deleted successfully.", {
          autoClose: 1500,
        });
      })
      .catch((err) => {
        toast.error("Failed to delete task. Please try again.", {
          autoClose: 1500,
        });
      });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp registerUser={registerUser} />} />
        <Route
          path="/signup"
          element={<SignUp registerUser={registerUser} />}
        />
        <Route
          path="/login"
          element={<Login loginUser={loginUser} error={error} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              fetchTasks={fetchTasks}
              tasks={tasks}
              changeStatus={changeStatus}
              handleLogout={handleLogout}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="/create-task"
          element={
            <CreateTask fetchTasks={fetchTasks} handleLogout={handleLogout} />
          }
        />
      </Routes>
      <ToastContainer />

      {loading && <Loader />}
    </>
  );
}

export default App;
