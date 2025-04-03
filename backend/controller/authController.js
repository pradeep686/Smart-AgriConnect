const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (email !== 'agriconnect2026@gmail.com') {
    return res.status(403).json({ message: 'Unauthorized email' });
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
  await User.updateOne({ email }, { otp, otpExpires }, { upsert: true });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).json({ message: 'Error sending OTP' });
    res.json({ message: 'OTP sent' });
  });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log('Received request body:', req.body);

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  console.log('User found:', user);
  console.log('Stored OTP:', user.otp, 'Provided OTP:', otp);
  console.log('Current Time:', new Date(), 'OTP Expiry:', new Date(user.otpExpires));

  if (user.otp !== String(otp) || new Date() > new Date(user.otpExpires)) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1d' });
  res.json({ message: 'Login successful', token });
};

module.exports = { sendOTP, verifyOTP };
