const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const pythonScriptPath = path.join(__dirname, 'app.py');
const modelFilePath = path.join(__dirname, 'decision_tree_model.pkl');

const options = {
    scriptPath: path.dirname(pythonScriptPath),
    args: [modelFilePath],
    mode: 'text',
    pythonOptions: ['-u'],
};

io.on('connection', (socket) => {
    console.log('Client connected');

    // Create a PythonShell instance for each client
    const pyShell = new PythonShell(path.basename(pythonScriptPath), options);
    pyShell.stdin.setEncoding('utf-8');

    pyShell.on('message', (message) => {
        console.log(message);
        socket.emit('output', message);
    });

    pyShell.on('error', (err) => {
        console.error('Error:', err);
    });

    pyShell.on('close', (code) => {
        console.log('Python script finished with code', code);
    });

    // Listen for user input from the client
    socket.on('input', (input) => {
        console.log('Received input:', input);

        // Send user input to the Python script
        pyShell.send(input);

        // You can also emit a message to indicate that the input has been received
        socket.emit('inputReceived', 'User input received: ' + input);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        pyShell.end(); // Terminate the PythonShell instance when the client disconnects
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// server.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });