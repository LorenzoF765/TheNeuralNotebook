import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/signup.css';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8000/modelgen', {
                username: username,
                password: password
            });

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
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
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
