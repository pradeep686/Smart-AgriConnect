const Product = require('../models/pesticidesModel');
const cloudinary = require('../config/cloudinaryConfig');

// Add a new pesticide product
const addPesticides = async (req, res) => {
    try {
        console.log("Adding Pesticide Product...");

        const {
            composition,
            usage,
            suitableCrops,
            benefits,
            marketPrice
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        cloudinary.uploader.upload_stream(
            { folder: 'pesticides_data' },
            async (error, result) => {
                if (error) return res.status(500).json({ error: error.message });

                const newProduct = new Product({
                    composition,
                    images: result.secure_url,
                    usage,
                    suitableCrops,
                    benefits,
                    marketPrice
                });

                await newProduct.save();
                return res.status(201).json({ message: 'Product added successfully', data: newProduct });
            }
        ).end(req.file.buffer);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all products
const getPesticides = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Edit a product
const editPesticides = async (req, res) => {
    try {
        const productId = req.params.id;

        const updateData = {
            composition: req.body.composition,
            usage: req.body.usage,
            suitableCrops: req.body.suitableCrops,
            benefits: req.body.benefits,
            marketPrice: req.body.marketPrice
        };

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'pesticides_data' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });
            updateData.images = result.secure_url;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Delete a product
const deletePesticides = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    addPesticides,
    getPesticides,
    editPesticides,
    deletePesticides
};
