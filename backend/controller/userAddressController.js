const addressSchema = require('../models/userAddressModel');

const addAddress = async (req, res) => {
    try {
        const { doorNo, street, city, pincode, district, state } = req.body;
        
        if (!doorNo || !street || !city || !pincode || !district || !state) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: "Unauthorized access" });
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

        let address = await addressSchema.findOne({ _id: addressId, userId: req.user.id });

        if (!address) {
            return res.status(404).json({ msg: "Address not found" });
        }

        if (address.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({ msg: "Unauthorized to edit this address" });
        }

        address = await addressSchema.findByIdAndUpdate(
            addressId,
            { doorNo, street, city, pincode, district, state },
            { new: true }
        );

        return res.status(200).json({ msg: "Address updated successfully", data: address });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};


const getAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const addresses = await addressSchema.find({ userId });

        return res.status(200).json({ success: true, data: addresses });

    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

module.exports = { addAddress, editAddress, getAddress };


