const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    category:{type:String,required:true},
  subsidyName: { type: String, required: true },
  image: { type: String, required: true }, // This will store Cloudinary URL
  shortInfo: { type: String, required: true },
  briefInfo: { type: String, required: true },
  objective: { type: String, required: true },
  eligibility: {
    whoCanApply: { type: [String], required: true },
    whoCannotApply: { type: [String], required: true },
  },
  benefits: { type: [String], required: true },
  documentsRequired: { type: [String], required: true },
  applicationProcess: { type: [String], required: true },
  beneficiaryStatus: { type: [String], required: true },
  importantConsiderations: { type: [String], required: true },
  officialWebsite: { type: String, required: true },
});

module.exports = mongoose.model('subsidyData', schema);
