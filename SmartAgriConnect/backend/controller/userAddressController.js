const personalInfoSchema = require('../models/userAddressModel');

const addPersonalInfo = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized. User not found." });
        }
        const existingInfo = await personalInfoSchema.findOne({ userId: req.user.id });

        if (existingInfo) {
            return res.status(400).json({ msg: "You have already added personal information. Use edit instead." });
        }

        const { fullName, phoneNumber, email, dateOfBirth, gender, village, taluk, district, state, pinCode, farmSize, soilType, currentCrops, animalFarm } = req.body;

        if (!fullName || !phoneNumber || !email || !dateOfBirth) {
            return res.status(400).json({ msg: "All required fields must be provided." });
        }

        const newInfo = new personalInfoSchema({
            userId: req.user.id,
            fullName,
            phoneNumber,
            email,
            dateOfBirth,
            gender,
            village,
            taluk,
            district,
            state,
            pinCode,
            farmSize,
            soilType,
            currentCrops,
            animalFarm
        });

        await newInfo.save();
        res.status(201).json({ msg: "Personal information added successfully", data: newInfo });
    } catch (e) {
        console.error("Server Error:", e.message);
        res.status(500).json({ msg: e.message });
    }
};

const editPersonalInfo = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const updatedInfo = await personalInfoSchema.findOneAndUpdate(
            { userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedInfo) {
            return res.status(404).json({ msg: "Personal information not found" });
        }

        return res.status(200).json({ msg: "Personal information updated successfully", data: updatedInfo });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const getPersonalInfo = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const info = await personalInfoSchema.findOne({ userId: req.user.id });

        if (!info) {
            return res.status(404).json({ msg: "Personal information not found" });
        }

        return res.status(200).json({ success: true, data: info });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const deletePersonalInfo = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const deletedInfo = await personalInfoSchema.findOneAndDelete({ userId: req.user.id });

        if (!deletedInfo) {
            return res.status(404).json({ msg: "Personal information not found" });
        }

        return res.status(200).json({ msg: "Personal information deleted successfully" });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

module.exports = { addPersonalInfo, editPersonalInfo, getPersonalInfo, deletePersonalInfo };
