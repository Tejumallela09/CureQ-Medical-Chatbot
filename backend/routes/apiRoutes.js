const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Adjust the path accordingly

router.use('/users', userRoutes);

module.exports = router;
