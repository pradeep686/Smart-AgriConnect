const Subsidy = require('../models/cropInsightModel');
const cloudinary = require('../config/cloudinaryConfig');

// Add a new crop insight
const addCropInsights = async (req, res) => {
    try {
        console.log("Adding Crop Insight...");

        const {
            category,
            name,
            description,
            scintificName,
            soilType,
            yieldPricePerAcer,
            uses,
            nutritionlValue
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        cloudinary.uploader.upload_stream(
            { folder: 'crop_insights' },
            async (error, result) => {
                if (error) return res.status(500).json({ error: error.message });

                const newCropInsight = new Subsidy({
                    category,
                    image: result.secure_url,
                    name,
                    description,
                    scintificName,
                    soilType,
                    yieldPricePerAcer,
                    uses,
                    nutritionlValue
                });

                await newCropInsight.save();
                return res.status(201).json({ message: 'Crop insight added successfully', data: newCropInsight });
            }
        ).end(req.file.buffer);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all crop insights
const getCropInsights = async (req, res) => {
    try {
        const insights = await Subsidy.find();
        return res.status(200).json(insights);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Edit a crop insight
const editCropInsights = async (req, res) => {
    try {
        const cropId = req.params.id;

        const updateData = {
            category: req.body.category,
            name: req.body.name,
            description: req.body.discription,
            scintificName: req.body.scintificName,
            soilType: req.body.soilType,
            yieldPricePerAcer: req.body.yieldPricePerAcer,
            uses: req.body.uses,
            nutritionlValue: req.body.nutritionlValue
        };

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'crop_insights' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });
            updateData.image = result.secure_url;
        }

        const updatedInsight = await Subsidy.findByIdAndUpdate(
            cropId,
            updateData,
            { new: true }
        );

        if (!updatedInsight) {
            return res.status(404).json({ error: 'Crop insight not found' });
        }

        return res.status(200).json({ message: 'Crop insight updated successfully', data: updatedInsight });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a crop insight
const deleteCropInsights = async (req, res) => {
    try {
        const cropId = req.params.id;
        const deletedInsight = await Subsidy.findByIdAndDelete(cropId);

        if (!deletedInsight) return res.status(404).json({ error: 'Crop insight not found' });

        return res.status(200).json({ message: 'Crop insight deleted successfully' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    addCropInsights,
    getCropInsights,
    editCropInsights,
    deleteCropInsights
};
