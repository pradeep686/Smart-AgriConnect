const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userLogin",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    village: {
        type: String
    },
    taluk: {
        type: String
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    farmSize: {
        type: String,
        required: true
    },
    soilType: {
        type: String,
        required: true
    },
    currentCrops: {
        type: String,
        required: true
    },
    animalFarm: {
        type: String
    }
});

module.exports = mongoose.model('PersonalInformation', schema);
