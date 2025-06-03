import React from 'react';
import '../Styles/navbar.css'; // Ensure you create a corresponding CSS file for styling

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">The Neural Notebook</h1>
            <div className="navbar-links">
                <a href="/" className="navbar-link">Home</a>
                <a href="/about" className="navbar-link">About</a>
                <a href="/contact" className="navbar-link">Contact</a>
            </div>
        </nav>
    );
}