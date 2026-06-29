const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authcontroller');

// Signup Route
router.post('/register', registerUser);

module.exports = router;