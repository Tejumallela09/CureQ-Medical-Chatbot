require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const apiRoutes = require('./routes/apiRoutes');

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/predict', require('./routes/predict'));
 // Use predict.js as middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}`);
});
