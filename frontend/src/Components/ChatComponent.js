import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
  const chatMessagesRef = useRef(null);
  const userInputRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on('output', (output) => {
      processOutput(output);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const submitBtnClickHandler = () => {
    const inputText = userInputRef.current.value.trim();
    if (inputText !== '') {
      appendMessage('User', inputText);
      socketRef.current.emit('input', inputText);
      userInputRef.current.value = '';
    }
  };

  const appendMessage = (sender, message) => {
    chatMessagesRef.current.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  };

  const processOutput = (output) => {
    // Check the type of output and update the client accordingly
    if (output.includes('Okay. From how many days ?Are you experiencing any (yes/no)')) {
      output = 'Are you experiencing any (yes/no) ';
    } else {
      const questionMarkIndex = output.indexOf('?');
      if (questionMarkIndex !== -1) {
        output = output.substring(0, questionMarkIndex + 1);
      }
    }
    appendMessage('Chatbot', output);
  };

  return (
    <div id="chat-container">
      <div id="chat-messages" ref={chatMessagesRef}></div>
      <div id="input-container">
        <input type="text" id="user-input" placeholder="Type your message..." ref={userInputRef} />
        <button id="submit-btn" onClick={submitBtnClickHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
