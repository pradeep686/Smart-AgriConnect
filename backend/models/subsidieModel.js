const mongoose = require('mongoose');

// Define schema for subsidy data
const schema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., Agriculture, Education, etc.
  subsidyName: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL for the subsidy image
  shortInfo: { type: String, required: true }, // Brief description
  briefInfo: { type: String, required: true }, // Detailed description
  objective: { type: String, required: true }, // Purpose of the subsidy
  eligibility: {
     type: String, required: true 
  },
  benefits: { type: String, required: true }, // What the applicant gains
  documentsRequired: { type: String, required: true }, // List of required documents
  applicationProcess: { type: String, required: true }, // Steps to apply
  beneficiaryStatus: { type: String, required: true }, // Info on checking status
  importantConsiderations: { type: String, required: true }, // Notes, tips, etc.
  officialWebsite: { type: String, required: true }, // Link to the official site
});

module.exports = mongoose.model('subsidyData', schema);
