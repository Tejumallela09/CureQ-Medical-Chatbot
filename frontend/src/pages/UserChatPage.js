// ChatComponent.js
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:3001'); // Update with your server URL

    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');

    function simulateUserInput(message) {
      if (message !== '..') {
        appendMessage('User', message);
      }
      socket.emit('input', message);
      userInput.value = '';
    }

    submitBtn.addEventListener('click', () => {
      const inputText = userInput.value.trim();
      if (inputText !== '') {
        simulateUserInput(inputText);

        setTimeout(() => {
          simulateUserInput('..');
        }, 500);
      }
    });

    socket.on('output', (output) => {
      processOutput(output);
    });

    function appendMessage(sender, message) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatMessages.appendChild(p);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processOutput(output) {
      if (output.includes('Okay. From how many days')) {
        const questionIndex = output.indexOf('?');
        if (questionIndex !== -1) {
          output = output.substring(questionIndex + 1).trim();
        }
        chatMessages.innerHTML += `<p><strong>Chatbot:</strong> ${output}</p>`;
      } else {
        appendMessage('Chatbot', output);
      }
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="chat-container">
      <div id="chat-messages"></div>
      <div id="input-container">
        <input type="text" id="user-input" placeholder="Type your message..." />
        <button id="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default ChatComponent;
