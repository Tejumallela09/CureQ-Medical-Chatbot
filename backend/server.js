require('dotenv').config(); // Add this line at the top

const express = require('express');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const predictRoutes = require('./routes/predict');  // Include predict.js

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use('/api', apiRoutes);
// app.use('/predict', predictRoutes);  // Set up the route for predict.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
