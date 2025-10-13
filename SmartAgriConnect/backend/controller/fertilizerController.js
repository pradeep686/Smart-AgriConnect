const Pesticide = require('../models/fertelizerModel');
const cloudinary = require('../config/cloudinaryConfig');

// Add a new pesticide
const addFertilizer= async (req, res) => {
    try {
        console.log("Adding Pesticide...");

        const {
            name,
            description,
            nutritentComposition,
            usage,
            suitableCrops,
            Benefiyts,
            marketPrice
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        cloudinary.uploader.upload_stream(
            { folder: 'pesticides' },
            async (error, result) => {
                if (error) return res.status(500).json({ error: error.message });

                const newPesticide = new Pesticide({
                    name,
                    image: result.secure_url,
                    description,
                    nutritentComposition,
                    usage,
                    suitableCrops,
                    Benefiyts,
                    marketPrice
                });

                await newPesticide.save();
                return res.status(201).json({ message: 'Pesticide added successfully', data: newPesticide });
            }
        ).end(req.file.buffer);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all pesticides
const getFertilizer = async (req, res) => {
    try {
        const pesticides = await Pesticide.find();
        return res.status(200).json(pesticides);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Edit a pesticide
const editFertilizer = async (req, res) => {
    try {
        const pestId = req.params.id;

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            nutritentComposition: req.body.nutritentComposition,
            usage: req.body.usage,
            suitableCrops: req.body.suitableCrops,
            Benefiyts: req.body.Benefiyts,
            marketPrice: req.body.marketPrice
        };

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'pesticides' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });
            updateData.image = result.secure_url;
        }

        const updatedPesticide = await Pesticide.findByIdAndUpdate(
            pestId,
            updateData,
            { new: true }
        );

        if (!updatedPesticide) {
            return res.status(404).json({ error: 'Pesticide not found' });
        }

        return res.status(200).json({ message: 'Pesticide updated successfully', data: updatedPesticide });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a pesticide
const deleteFertilizer = async (req, res) => {
    try {
        const pestId = req.params.id;
        const deletedPesticide = await Pesticide.findByIdAndDelete(pestId);

        if (!deletedPesticide) {
            return res.status(404).json({ error: 'Pesticide not found' });
        }

        return res.status(200).json({ message: 'Pesticide deleted successfully' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    addFertilizer,
    getFertilizer,
    editFertilizer,
    deleteFertilizer
};
