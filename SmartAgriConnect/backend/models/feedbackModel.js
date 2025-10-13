const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    resolved: { type: Boolean, default: false } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
