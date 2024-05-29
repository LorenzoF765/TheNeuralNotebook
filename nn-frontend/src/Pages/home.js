import React from 'react';
import '../Styles/home.css'; 
import { Link } from 'react-router-dom'; 
import Navbar from './Navbar';

export default function HomePage() {
    return (
        <div className="home-container">
            <Navbar />
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
                <h3>What is the Neural Notebook?</h3>
                <p>
                    The Neural Notebook is the playground for the abovementioned AI, Kai. The Neural Notebook is currently just a small webspace where you can document your day-to-day, or just talk to Kai. Think of it as an upgrade to your normal notes app.
                </p>
                <h3>What is Kai?</h3>
                <p>
                    Kai is a personalized model that has been trained and brought up from a pre-existing framework, in this case OpenAIs GPT-4-Turbo Model. In the future, Kai will have friends that include my next big project, Eden, who will be an AI model that I build from scratch. I also plan to incorporate multiple models so that Ai-To-Ai conversation can one day enhance your experience here.
                </p>
                <h3>Why Kai?</h3>
                <p>
                    Kai is Kai for a couple of reasons. When picking what I wanted to name the flagship of my Capstone Project at Neumont College of Computer Science, I wanted it to be 
                    <ol>
                        <li>Catchy. Kai rolls off the tongue, and at first glance you can see that AI is right in the name!</li>
                        <li>Meaningful. I am a big fan of the greek alphabet, or just greek culture in general. In the greek alphabet, K or Kappa, Represents Truth and Loyalty, the two things i want my AI to embody. From the minute you log in, Kai becomes tailored to you. Kai is ultimately what you make of him, with some restrictions of course. That, and for the most part, my program won't lie to you. I'd hope.</li>
                        <li>Fun for you. When you read kai, you can read and understand what I put into it, or you can read Killer artificial intelligence, like my professor did. This is your notebook, why not let it be a fun one, with all the stickers and everything that makes it yours.</li>
                    </ol>
                </p>
            </section>
            
            <section className="home-actions">
                <h2>Get Started</h2>
                <p>
                    Ready to dive in? Explore our features and see how The Neural Notebook can help you.
                </p>
                <Link to="/signup" className="home-button">Create an Account</Link>
                <Link to="/login" className="home-button">Login</Link> {/* Added Link to Login Page */}
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
