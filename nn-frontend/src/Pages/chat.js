import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/chat.css';
import Navbar from './Navbar';

export default function ChatPage() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [savedConversations, setSavedConversations] = useState([]);
    const [loadingCreative, setLoadingCreative] = useState(false);
    const [loadingTechnical, setLoadingTechnical] = useState(false);
    const [loadingKai, setLoadingKai] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const savedConversations = localStorage.getItem('savedConversations');
        if (savedConversations) {
            setSavedConversations(JSON.parse(savedConversations));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('savedConversations', JSON.stringify(savedConversations));
    }, [savedConversations]);

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoadingCreative(true);
        setLoadingTechnical(true);
        setLoadingKai(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/collaborative-chat/', {
                msgData: userInput,
                conversation: conversation,
            });

            const { creative, technical, kai } = response.data;

            const newConversation = [
                ...conversation,
                { user: userInput, creative, technical, kai },
            ];
            setConversation(newConversation);
            setUserInput('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert(`Error: ${error.response?.data?.error || 'An unknown error occurred'}`);
        } finally {
            setLoadingCreative(false);
            setLoadingTechnical(false);
            setLoadingKai(false);
        }
    };

    const saveConversation = () => {
        const timestamp = new Date().toISOString();
        const summary = conversation
            .slice(0, 2)
            .map((msg) => msg.user)
            .join(' | ');

        const savedConversation = {
            id: timestamp,
            summary: summary || 'No summary available',
            conversation: conversation,
        };

        setSavedConversations([...savedConversations, savedConversation]);
        setConversation([]);
    };

    const handleOpenConversation = (index) => {
        setConversation(savedConversations[index].conversation);
    };

    return (
        <div className="chat-container">
            <Navbar />

            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <h2>Saved Conversations</h2>
                {savedConversations.map((savedConversation, index) => (
                    <div
                        key={savedConversation.id}
                        className="saved-conversation"
                        onClick={() => handleOpenConversation(index)}
                    >
                        <p>{savedConversation.summary}</p>
                    </div>
                ))}
            </div>

            <div className={`chat-window ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <h1 className="chat-header">Chat with Kai</h1>
                <form onSubmit={onSubmit}>
                    <input
                        className="chat-input"
                        type="text"
                        value={userInput}
                        onChange={handleUserInputChange}
                        placeholder="Type your message here..."
                    />
                    <button className="chat-submit" type="submit">
                        Send
                    </button>
                </form>
                {conversation.map((msg, index) => (
                    <div key={index} className="message">
                        <p>You: {msg.user}</p>
                        <div className="ai-response">
                            <span className="avatar avatar-lunaris" title="Lunaris">
                                <svg width="32" height="32" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="15" fill="#b0c4de" stroke="#fff" strokeWidth="2"/>
                                    <circle cx="11" cy="14" r="2" fill="#fff"/>
                                    <circle cx="21" cy="14" r="2" fill="#fff"/>
                                    <path d="M12 22 Q16 26 20 22" stroke="#fff" strokeWidth="2" fill="none">
                                        <animate attributeName="d" values="M12 22 Q16 26 20 22;M12 22 Q16 24 20 22;M12 22 Q16 26 20 22" dur="1.5s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </span>
                            <span className="creative">Lunaris Response: {msg.creative}</span>
                        </div>
                        <div className="ai-response">
                            <span className="avatar avatar-solaris" title="Solaris">
                                <svg width="32" height="32" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="15" fill="#ffa500" stroke="#fff" strokeWidth="2"/>
                                    <circle cx="11" cy="14" r="2" fill="#fff"/>
                                    <circle cx="21" cy="14" r="2" fill="#fff"/>
                                    <path d="M12 22 Q16 26 20 22" stroke="#fff" strokeWidth="2" fill="none">
                                        <animate attributeName="d" values="M12 22 Q16 26 20 22;M12 22 Q16 24 20 22;M12 22 Q16 26 20 22" dur="1.5s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </span>
                            <span className="technical">Solaris Response: {msg.technical}</span>
                        </div>
                        <div className="ai-response">
                            <span className="avatar avatar-kai" title="Kai">
                                <svg width="32" height="32" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="15" fill="#a040f4" stroke="#fff" strokeWidth="2"/>
                                    <circle cx="11" cy="14" r="2" fill="#fff"/>
                                    <circle cx="21" cy="14" r="2" fill="#fff"/>
                                    <path d="M12 22 Q16 26 20 22" stroke="#fff" strokeWidth="2" fill="none">
                                        <animate attributeName="d" values="M12 22 Q16 26 20 22;M12 22 Q16 24 20 22;M12 22 Q16 26 20 22" dur="1.5s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </span>
                            <span className="kai">Kai's Response: {msg.kai}</span>
                        </div>
                    </div>
                ))}
                {loadingCreative && (
                    <div className="loading-indicator creative">
                        <p>
                            <span className="avatar avatar-lunaris" title="Lunaris">
                                <svg width="24" height="24" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="15" fill="#b0c4de" stroke="#fff" strokeWidth="2"/>
                                    <circle cx="11" cy="14" r="2" fill="#fff"/>
                                    <circle cx="21" cy="14" r="2" fill="#fff"/>
                                    <path d="M12 22 Q16 26 20 22" stroke="#fff" strokeWidth="2" fill="none">
                                        <animate attributeName="d" values="M12 22 Q16 26 20 22;M12 22 Q16 24 20 22;M12 22 Q16 26 20 22" dur="1.5s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </span>
                            Lunaris is typing<span className="dots">...</span>
                        </p>
                    </div>
                )}
                {loadingTechnical && (
                    <div className="loading-indicator technical">
                        <p>
                            <span className="avatar avatar-solaris" title="Solaris">
                                <svg width="24" height="24" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="15" fill="#ffa500" stroke="#fff" strokeWidth="2"/>
                                    <circle cx="11" cy="14" r="2" fill="#fff"/>
                                    <circle cx="21" cy="14" r="2" fill="#fff"/>
                                    <path d="M12 22 Q16 26 20 22" stroke="#fff" strokeWidth="2" fill="none">
                                        <animate attributeName="d" values="M12 22 Q16 26 20 22;M12 22 Q16 24 20 22;M12 22 Q16 26 20 22" dur="1.5s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </span>
                            Solaris is typing<span className="dots">...</span>
                        </p>
                    </div>
                )}
                {loadingKai && (
                    <div className="loading-indicator kai">
                        <p>
                            <span className="avatar avatar-kai" title="Kai">
                                <svg width="24" height="24" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="15" fill="#a040f4" stroke="#fff" strokeWidth="2"/>
                                    <circle cx="11" cy="14" r="2" fill="#fff"/>
                                    <circle cx="21" cy="14" r="2" fill="#fff"/>
                                    <path d="M12 22 Q16 26 20 22" stroke="#fff" strokeWidth="2" fill="none">
                                        <animate attributeName="d" values="M12 22 Q16 26 20 22;M12 22 Q16 24 20 22;M12 22 Q16 26 20 22" dur="1.5s" repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </span>
                            Kai is typing<span className="dots">...</span>
                        </p>
                    </div>
                )}
                {conversation.length > 0 && (
                    <button className="save-button" onClick={saveConversation}>
                        Save Conversation
                    </button>
                )}
            </div>
        </div>
    );
}