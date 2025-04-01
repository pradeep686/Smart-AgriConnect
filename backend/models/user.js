const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('User', UserSchema);
