import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav>
            <div>
                <Link to="/">Home</Link>
                <Link to="/users">Users</Link>
                <Link to="/report">Report</Link>
            </div>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;