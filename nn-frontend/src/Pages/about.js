import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import "../Styles/about.css"; // Ensure you create a corresponding CSS file for styling

export default function AboutPage() {
    return (
        
        <div className="about-container" style={{
            maxWidth: 700,
            margin: "60px auto 0 auto",
            padding: "36px 28px 32px 28px",
            background: "#202022",
            borderRadius: 18,
            boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
            color: "#f5f5f5"
        }}>
            <Navbar />
            <h1 style={{
                color: "#a040f4",
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 800,
                fontSize: "2.2rem",
                marginBottom: 18
            }}>
                About The Neural Notebook
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#bdbdbd", marginBottom: 24 }}>
                TheNeuralNotebook, created by inspiring mind Lorenzo Franco, serves as the initial steps at what he hopes to be his ultimate project: a sustainable, not-creepy, and nonthreatening mental health AI companion.
            </p>
            <p style={{ fontSize: "1.08rem", color: "#e0e0e0", lineHeight: 1.7, marginBottom: 18 }}>
                TheNeuralNotebook has kind of served as my playground for unique and creative ways to mess around with LLMs, both self-trained and pre-trained, as well as kind of push the limits of how they communicate with one another before presenting data to the user.
            </p>
            <p style={{ fontSize: "1.08rem", color: "#e0e0e0", lineHeight: 1.7 }}>
                That being said - if you're reading this, my prototype isn't just on scratch anymore, it's live up on the internet somewhere.
            </p>
        </div>
    );
}