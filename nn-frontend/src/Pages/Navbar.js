import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css'; // Import your CSS file for styling

export default function Navbar() {
    return (
        <div className="navbar-container">
            <Link to="/" className="navbar-button">Home</Link>
            <Link to="/chat" className="navbar-button">Chat</Link>
            <Link to="/login" className="navbar-button">Login</Link>
        </div>
    );
}
