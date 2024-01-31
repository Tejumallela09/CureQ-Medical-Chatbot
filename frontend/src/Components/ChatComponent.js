// File: src/pages/components/ChatComponent.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
  // Declare socket using useState
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket in the useEffect
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Event listener for receiving messages from the server
    newSocket.on('output', (message) => {
      console.log('Received message from server:', message);
      // Handle the received message as needed
    });

    // Event listener for handling input acknowledgment
    newSocket.on('inputReceived', (ack) => {
      console.log('Server acknowledged input:', ack);
      // Handle the acknowledgment as needed
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures useEffect runs once

  const handleSendMessage = () => {
    const userInput = '...'; // Replace with the actual user input
    // Emit the user input to the server
    socket.emit('input', userInput);
  };

  return (
    <div>
      {/* Your chat component UI */}
      <div id="chat-messages"></div>
      <div id="input-container">
        <input type="text" id="user-input" placeholder="Type your message..." />
        <button id="submit-btn" onClick={handleSendMessage}>Submit</button>
      </div>

      {/* Your HTML styles */}
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            flex-direction: column;
            height: 100vh;
          }

          #chat-messages {
            flex: 1;
            overflow-y: scroll;
            padding: 20px;
          }

          /* ... Add your other styles ... */
        `}
      </style>

      {/* Additional scripts */}
      <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
      <script src="/socket.io/socket.io.js"></script>

      {/* Your jQuery/Socket.IO script */}
      <script>
        {`
          $(document).ready(function () {
            const chatMessages = $('#chat-messages');
            const userInput = $('#user-input');
            const submitBtn = $('#submit-btn');

            function simulateUserInput(message) {
              if (message !== "..") {
                appendMessageuser(message, 'user-message', 'user-icon');
              }
              socket.emit('input', message);
              userInput.val('');
            }

            submitBtn.click(function () {
              const inputText = userInput.val().trim();
              if (inputText !== '') {
                simulateUserInput(inputText);

                setTimeout(function () {
                  simulateUserInput('..');
                }, 500);
              }
            });

            socket.on('output', function (output) {
              processOutput(output);
            });

            function appendMessageuser(message, className, iconClass) {
              const messageBox = $('<div class="message-box ' + className + '"></div>');

              messageBox.append(\`<p><i class="\${iconClass}"></i> \${message}</p>\`);
              chatMessages.append(messageBox);
              chatMessages.scrollTop(chatMessages[0].scrollHeight);
            }

            function appendMessage(message, className) {
              const messageBox = $('<div class="message-box ' + className + '"></div>');

              messageBox.append(\`<p> \${message}</p>\`);
              chatMessages.append(messageBox);
              chatMessages.scrollTop(chatMessages[0].scrollHeight);
            }

            function processOutput(output) {
              if (output.includes('Okay. From how many days')) {
                const questionIndex = output.indexOf('?');
                if (questionIndex !== -1) {
                  output = output.substring(questionIndex + 1).trim();
                }
                appendMessage(output, 'chatbot-message');
              }
              else if (output.includes('Would you like to book an appointment?')) {
                $('#input-container').hide();
                $('#appointment-box').show();
              }
              else {
                appendMessage(output, 'chatbot-message');
              }
            }

            function handleAppointment(response) {
              if (response.toLowerCase() === 'yes') {
                // window.location.href = 'frontend\\src\\Pages\\user\UserAppointmentDetailsPage.js';
              } else {
                $('#appointment-box').hide();
                appendMessage('Thanks for chatting!', 'chatbot-message');
              }
            }
          });
        `}
      </script>
    </div>
  );
};

export default ChatComponent;
