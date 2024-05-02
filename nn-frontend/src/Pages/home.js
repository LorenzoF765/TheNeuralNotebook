import React from 'react';
import '../Styles/home.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom'; // For navigation to other pages

export default function HomePage() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to The Neural Notebook!</h1>
                <p>
                    A project by Lorenzo Franco, powered by AI technology. Developed in about 8 weeks,
                    with large plans for the future.
                </p>
            </header>
            
            <section className="home-about">
                <h2>About This Project</h2>
                <p>
                    The Neural Notebook is an application designed to leverage AI technology to enhance 
                    productivity and creativity. Our AI, built up from GPT4-Turbo, named Kai, helps users with various tasks 
                    ranging from generating ideas to answering questions.
                </p>
            </section>
            
            <section className="home-actions">
                <h2>Get Started</h2>
                <p>
                    Ready to dive in? Explore our features and see how The Neural Notebook can help you.
                </p>
                <Link to="/signup" className="home-button">Create an Account</Link>
                <Link to="/about" className="home-button">Learn More</Link>
            </section>

            <footer className="home-footer">
                <p>
                    © 2024 The Neural Notebook. All rights reserved. Developed by Lorenzo Franco.
                </p>
            </footer>
        </div>
    );
}
