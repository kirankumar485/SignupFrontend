import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Users from "./components/Users";
import Report from "./components/Report";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Sync isLoggedIn with localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/report" element={<Report />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={handleLogin} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;