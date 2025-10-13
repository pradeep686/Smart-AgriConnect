const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  composition: { type: String, required: true },
  images:{type: String, required: true},
  usage: { type: String, required: true },
  suitableCrops: { type: String, required: true },
  benefits: { type: String, required: true },
  marketPrice: { type: String, required: true }
});

const Product = mongoose.model('pesticidesData', productSchema);

module.exports = Product;
