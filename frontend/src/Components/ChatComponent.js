// ChatComponent.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ChatComponent = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [inputContainerVisible, setInputContainerVisible] = useState(true);
    const [appointmentBoxVisible, setAppointmentBoxVisible] = useState(false);
    const socket = io('http://localhost:3001');
    useEffect(() => {
        

        socket.on('output', (output) => {
            processOutput(output);
        });

        return () => {
            socket.disconnect();
        };
    }, []); // <-- Make sure to include the dependency array

    const simulateUserInput = (message) => {
        if (message !== '..') {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { text: message, className: 'user-message', iconClass: 'user-icon' },
            ]);
        }

        socket.emit('input', message);
        setUserInput('');
    };

    const handleSubmit = () => {
        const inputText = userInput.trim();
        if (inputText !== '') {
            simulateUserInput(inputText);

            setTimeout(() => {
                simulateUserInput('..');
            }, 500);
        }
    };

    const processOutput = (output) => {
        if (output.includes('Okay. From how many days')) {
            const questionIndex = output.indexOf('?');
            if (questionIndex !== -1) {
                output = output.substring(questionIndex + 1).trim();
            }
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { text: output, className: 'chatbot-message' },
            ]);
        } else if (output.includes('Would you like to book an appointment?')) {
            setAppointmentBoxVisible(true);
            setInputContainerVisible(false);
        } else {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { text: output, className: 'chatbot-message' },
            ]);
        }
    };

    return (
        <div>
            <div id="chat-messages">
                {chatMessages.map((message, index) => (
                    <div key={index} className={`message-box ${message.className}`}>
                        <p>
                            {message.iconClass && <i className={message.iconClass}></i>}
                            {message.text}
                        </p>
                    </div>
                ))}
            </div>
            {inputContainerVisible && (
                <div>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
            {appointmentBoxVisible && (
                <div id="appointment-box">
                    {/* Render appointment box content */}
                </div>
            )}
        </div>
    );
};

export default ChatComponent;