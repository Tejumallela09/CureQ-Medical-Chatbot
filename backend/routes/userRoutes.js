// userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser } = require('../controllers/userController');
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");

// Exclude the following routes from verifyIsLoggedIn middleware
router.post('/register', registerUser);
router.post('/login', loginUser); // Make sure this route is defined

// Admin routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get('/', getUsers);

// User Logged in routes

module.exports = router;
