import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { toast } from "react-toastify";
import "../styles.css";

const Report = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [filter, setFilter] = useState({ name: "", email: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Fetch users from the mock API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch(error) {
                toast.error("Error fetching users");
            }
        };

        fetchUsers();
    }, []);

    // Handle sorting
    const handleSort = (key) => {
        let direction = "asc";
        if(sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sortedUsers = [...filteredUsers].sort((a, b) => {
            if(a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if(a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredUsers(sortedUsers);
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });

        const filtered = users.filter((user) => {
            return (
                user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
                user.email.toLowerCase().includes(filter.email.toLowerCase())
            );
        });

        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="report">
            <h2>User Activity Report</h2>

            <div className="filters">
                <input
                    type="text"
                    name="name"
                    placeholder="Filter by name"
                    value={filter.name}
                    onChange={handleFilter}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Filter by email"
                    value={filter.email}
                    onChange={handleFilter}
                />
            </div>

            {/* Users Table */}
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("name")}>
                            Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("email")}>
                            Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th>Username</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.address.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                {Array.from(
                    { length: Math.ceil(filteredUsers.length / itemsPerPage) },
                    (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    )
                )}
            </div>

            {/* Bar Chart */}
            <BarChart width={600} height={300} data={filteredUsers}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="id" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default Report;