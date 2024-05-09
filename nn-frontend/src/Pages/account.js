import React, { useState } from 'react';
import axios from 'axios';

export default function AccountPage() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/createUser', {
                username: 'username', // Replace 'username' with the username you want to associate with the name and age
                name: name,
                age: age
            });

            setSuccess(true); // Indicate success
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Welcome to the Account Page!</h1>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                />
                <button type="submit">Save</button>
            </form>

            {error && (
                <div className="error-message">
                    <p>{error}</p> {/* Display error message */}
                </div>
            )}

            {success && (
                <div>
                    <p>Data saved successfully!</p> {/* Display success message */}
                </div>
            )}
        </div>
    );
}
