import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles.css";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token:", token);
                const response = await axios.get("http://localhost:5000/api/users", {
                    headers: { Authorization: token },
                });
                console.log("Response:", response);

                // Normalize the data
                let userData = response.data;
                if(!Array.isArray(userData)) {
                    userData = [userData];
                }

                setUsers(userData);
            } catch(error) {
                toast.error("Error fetching users");
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="users">
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;