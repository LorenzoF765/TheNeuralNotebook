import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../Styles/chat.css';
import Navbar from './Navbar'; // Assuming you have a Navbar component

export default function ChatPage() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [savedConversations, setSavedConversations] = useState([]);

    // Load saved conversations from localStorage when the component mounts
    useEffect(() => {
        const savedConversations = localStorage.getItem('savedConversations');
        if (savedConversations) {
            setSavedConversations(JSON.parse(savedConversations));
        }
    }, []);

    // Save conversations to localStorage whenever they are updated
    useEffect(() => {
        localStorage.setItem('savedConversations', JSON.stringify(savedConversations));
    }, [savedConversations]);

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/chat', {
                msgData: userInput,
                conversation: conversation
            });
            const aiResponse = response.data.response[0][1];
            const newConversation = [...conversation, { user: userInput, ai: aiResponse }];
            setConversation(newConversation);
            setUserInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const saveConversation = () => {
        const timestamp = new Date().toISOString();
        const savedConversation = { id: timestamp, conversation: conversation };

        setSavedConversations([...savedConversations, savedConversation]);
        setConversation([]);
    };

    const handleOpenConversation = (index) => {
        setConversation(savedConversations[index].conversation);
    };

    return (
        <div className="chat-container">
            <Navbar />
            <div className="sidebar">
                <h2>Saved Conversations</h2>
                {savedConversations.map((savedConversation, index) => (
                    <div key={savedConversation.id} className="saved-conversation" onClick={() => handleOpenConversation(index)}>
                        <p>{savedConversation.id}</p>
                    </div>
                ))}
            </div>
            <div className="chat-window">
                <h1 className="chat-header">Chat with Kai</h1>
                <form onSubmit={onSubmit}>
                    <input
                        className="chat-input"
                        type="text"
                        value={userInput}
                        onChange={handleUserInputChange}
                        placeholder="Type your message here..."
                    />
                    <button className="chat-submit" type="submit">Send</button>
                </form>
                {conversation.map((msg, index) => (
                    <div key={index} className="message">
                        <p>You: {msg.user}</p>
                        <p>Kai: {msg.ai}</p>
                    </div>
                ))}
                {conversation.length > 0 && (
                    <button className="save-button" onClick={saveConversation}>Save Conversation</button>
                )}
            </div>
        </div>
    );
}
