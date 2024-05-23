import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Api';
import '../Styles/signup.css';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser({ username, password });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Username is already in use.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit} className="signup-form">
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
            </form>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
