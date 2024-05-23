import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/account.css';

export default function AccountPage() {
    const [isLocked, setIsLocked] = useState(true);
    const [name, setName] = useState('Lorenzo');
    const [age, setAge] = useState('21');

    const handleEdit = () => {
        setIsLocked(!isLocked);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    return (
        <div className="account-container">
            <h1>Your Account</h1>
            <div className="account-details">
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    readOnly={isLocked}
                    className={isLocked ? 'locked' : 'editable'}
                />
                <input
                    type="text"
                    value={age}
                    onChange={handleAgeChange}
                    readOnly={isLocked}
                    className={isLocked ? 'locked' : 'editable'}
                />
                <Link to="/chat">
                    <button>Chat</button>
                </Link>
                <button onClick={handleEdit}>{isLocked ? 'Edit' : 'Save'}</button>
            </div>
        </div>
    );
}
