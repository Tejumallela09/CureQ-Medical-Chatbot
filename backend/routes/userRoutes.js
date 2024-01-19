const express = require('express');
const router = express.Router();
const { getUsers,registerUser } = require('../controllers/userController');

// admin routes:
router.get('/', getUsers);


router.post('/register', registerUser);

//user Logged in routes:


module.exports = router;
