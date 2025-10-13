const mongoose = require('mongoose');

const fertilizer = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  nutritentComposition: { type: String, required: true },
  usage: { type: String, required: true },
  suitableCrops: { type: String, required: true },
  Benefiyts: { type: String, required: true },
  marketPrice: { type: String, required: true }
});

const fert = mongoose.model('fertilizerData', fertilizer);

module.exports = fert;
