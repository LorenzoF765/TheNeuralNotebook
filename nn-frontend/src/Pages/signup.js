import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Correctly imported
import { Link } from 'react-router-dom'; // For navigation to other pages
import '../Styles/signup.css';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const csrfToken = Cookies.get('csrftoken'); // Retrieve CSRF token

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/modelgen',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken, // Include CSRF token
                    },
                }
            );

            setSuccess(true); // Indicate success
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Username is already in use.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <h1>Welcome to the Account Creation Page!</h1>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError(null); // Clear error on change
                    }}
                    value={username}
                />
                <input
                    type="text" // Ensure correct input type for password
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null); // Clear error on change
                    }}
                    value={password}
                />
                <button type="submit">Sign Up</button>
                <Link to="/login" className="home-button">Already have an account? Login!</Link>
            </form>

            {error && (
                <div className="error-message">
                    <p>{error}</p> {/* Display error message */}
                </div>
            )}

            {success && (
                <div>
                    <p>Account created successfully!</p> {/* Display success message */}
                </div>
            )}
        </div>
    );
}
