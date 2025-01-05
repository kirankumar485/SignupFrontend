import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Register = ({ setIsLoggedIn }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("role", role);
            formData.append("image", image);

            const response = await axios.post(
                "https://signupbackend-lu57.onrender.com/api/auth/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            localStorage.setItem("user", JSON.stringify(response.data.user));
            console.log(response.data)
            localStorage.setItem("token", response.data.token);

            localStorage.setItem("isLoggedIn", "true");
            toast.success("Registered successfully");
            setIsLoggedIn(true);
            navigate("/");
        } catch(error) {
            toast.error("Error registering user");
            console.error("Registration error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="auth-page">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;