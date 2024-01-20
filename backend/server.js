require('dotenv').config();

const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const chatRoute = require('./predict'); // Correct the path to predict.js
const path = require('path');

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

// Use the router in the /chat route
app.use('/chat', chatRoute);

// Serve the React app
app.use(express.static(path.join(__dirname, 'build', 'frontend')));
app.get('/user/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
