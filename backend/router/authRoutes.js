const express = require('express');
const { sendOTP, verifyOTP } = require('../controller/authController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Protected Route Example
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.user });
});

module.exports = router;
