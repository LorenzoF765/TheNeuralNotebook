import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Api';
import '../Styles/login.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setError(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null);
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/account');
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="login-container">
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
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
