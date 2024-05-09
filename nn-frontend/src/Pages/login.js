import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/login.css'; // Import your styling

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // For error messages
    const navigate = useNavigate(); // For navigation

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setError(null); // Clear error message on change
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null); // Clear error message on change
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/login', // Endpoint for login
                data,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.status === 200) {
                // If login is successful, navigate to the account page
                navigate('/account'); // Navigate to Account.js
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="login-container"> {/* Container for styling */}
            <h1>Login to Your Account</h1>

            <form className="login-form" onSubmit={onLoginSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>

            {error && (
                <div className="error-message"> {/* Display error message if there's an error */}
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
