const addressSchema = require('../models/userAddressModel');

const addAddress = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const existingAddress = await addressSchema.findOne({ userId: req.user.id });
        if (existingAddress) {
            return res.status(400).json({ msg: "Address already added" });
        }

        const { doorNo, street, city, pincode, district, state } = req.body;

        if (!doorNo || !street || !city || !pincode || !district || !state) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const newAddress = await addressSchema.create({
            userId: req.user.id,
            doorNo,
            street,
            city,
            pincode,
            district,
            state
        });

        return res.status(201).json({ msg: "Address added successfully", data: newAddress });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const editAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const { doorNo, street, city, pincode, district, state } = req.body;

        if (!addressId) {
            return res.status(400).json({ msg: "Address ID is required" });
        }

        const address = await addressSchema.findOne({ _id: addressId, userId: req.user.id });

        if (!address) {
            return res.status(404).json({ msg: "Address not found" });
        }

        const updatedAddress = await addressSchema.findByIdAndUpdate(
            addressId,
            { doorNo, street, city, pincode, district, state },
            { new: true }
        );

        return res.status(200).json({ msg: "Address updated successfully", data: updatedAddress });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const getAddress = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const addresses = await addressSchema.find({ userId: req.user.id });

        return res.status(200).json({ success: true, data: addresses });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;

        if (!addressId) {
            return res.status(400).json({ msg: "Address ID is required" });
        }

        const address = await addressSchema.findOne({ _id: addressId, userId: req.user.id });

        if (!address) {
            return res.status(404).json({ msg: "Address not found" });
        }

        await addressSchema.findByIdAndDelete(addressId);

        return res.status(200).json({ msg: "Address deleted successfully" });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

module.exports = { addAddress, editAddress, getAddress, deleteAddress };
