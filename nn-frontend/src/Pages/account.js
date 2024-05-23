import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { updateUser } from '../Api';
import '../Styles/account.css';

export default function AccountPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await API.get('/api/user/', {
                headers: { Authorization: `Token ${token}` }
            });
            if (response.data) {
                setName(response.data.name);
                setAge(response.data.age);
            }
        } catch (error) {
            setError('Failed to fetch user data.');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            await updateUser({ name, age }, token);
            setIsLocked(true);
            setSuccess('Profile updated successfully.');
        } catch (error) {
            setError('Failed to update profile.');
        }
    };

    const handleEdit = () => {
        setIsLocked(false);
    };

    return (
        <div className="account-container">
            <h1>Your Account</h1>
            <div className="account-details">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLocked}
                />
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    disabled={isLocked}
                />
                {isLocked ? (
                    <button onClick={handleEdit}>Edit</button>
                ) : (
                    <button onClick={handleSave}>Save</button>
                )}
            </div>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
