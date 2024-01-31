const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Adjust the path accordingly
const predict = require('./predict');
const jwt = require("jsonwebtoken");

router.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

router.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        return res.json({ token: decoded.name, isAdmin: decoded.isAdmin });
    } catch (err) {
        return res.status(401).send("Unauthorized. Invalid Token");
    }
});

router.use('/users', userRoutes);
router.use('/chat', userRoutes);
module.exports = router;
