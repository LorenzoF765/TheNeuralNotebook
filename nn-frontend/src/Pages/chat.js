import axios from 'axios';
import React, { useState } from 'react';
import '../Styles/chat.css';

export default function ChatPage() {
    const [userInput, setUserInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [savedConversations, setSavedConversations] = useState([]);

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/chat', {
              msgData: userInput,
              conversation: conversation // Include the entire conversation
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
        const today = new Date().toISOString().split('T')[0];
        const savedConversation = { date: today, conversation: conversation };
        setSavedConversations([...savedConversations, savedConversation]);
        setConversation([]);
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <h2>Saved Conversations</h2>
                {savedConversations.map((conversation, index) => (
                    <div key={index} className="saved-conversation">
                        <p>{conversation.date}</p>
                        {conversation.conversation.map((msg, index) => (
                            <div key={index} className="message">
                                <p>User: {msg.user}</p>
                                <p>AI: {msg.ai}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="chat-window">
                <h1>Chat with AI</h1>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInputChange}
                        placeholder="Type your message here..."
                    />
                    <button type="submit">Send</button>
                </form>
                {conversation.map((msg, index) => (
                    <div key={index} className="message">
                        <p>User: {msg.user}</p>
                        <p>AI: {msg.ai}</p>
                    </div>
                ))}
                {conversation.length > 0 && (
                    <button onClick={saveConversation}>Save Conversation</button>
                )}
            </div>
        </div>
    );
}
