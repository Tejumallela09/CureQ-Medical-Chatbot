const express = require('express');
const router = express.Router();
const { getUsers,registerUser , loginUser} = require('../controllers/userController');

// admin routes:
router.get('/', getUsers);


router.post('/register', registerUser);
router.post('/login', loginUser);
//user Logged in routes:


module.exports = router;
