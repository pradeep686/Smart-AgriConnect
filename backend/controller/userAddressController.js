const personalInfoSchema = require('../models/userAddressModel');

const addPersonalInfo = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const existingInfo = await personalInfoSchema.findOne({ userId: req.user.id });
        if (existingInfo) {
            return res.status(400).json({ msg: "Personal information already exists" });
        }

        const newInfo = await personalInfoSchema.create({
            userId: req.user.id,
            ...req.body
        });

        return res.status(201).json({ msg: "Personal information added successfully", data: newInfo });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const editPersonalInfo = async (req, res) => {
    try {
        const { infoId } = req.params;

        if (!infoId) {
            return res.status(400).json({ msg: "Information ID is required" });
        }

        const info = await personalInfoSchema.findOne({ _id: infoId, userId: req.user.id });

        if (!info) {
            return res.status(404).json({ msg: "Personal information not found" });
        }

        const updatedInfo = await personalInfoSchema.findByIdAndUpdate(infoId, req.body, { new: true });

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
        const { infoId } = req.params;

        if (!infoId) {
            return res.status(400).json({ msg: "Information ID is required" });
        }

        const info = await personalInfoSchema.findOne({ _id: infoId, userId: req.user.id });

        if (!info) {
            return res.status(404).json({ msg: "Personal information not found" });
        }

        await personalInfoSchema.findByIdAndDelete(infoId);

        return res.status(200).json({ msg: "Personal information deleted successfully" });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

module.exports = { addPersonalInfo, editPersonalInfo, getPersonalInfo, deletePersonalInfo };
