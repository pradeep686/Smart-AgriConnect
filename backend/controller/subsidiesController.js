const Subsidy = require('../models/subsidieModel');
const cloudinary = require('../config/cloudinaryConfig');

// Utility function to safely parse JSON
const safeParseJSON = (data, defaultValue = []) => {
    try {
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        return defaultValue;
    }
};

// Add a new subsidy
const addSubSidies = async (req, res) => {
    try {
        console.log("Adding Subsidy...");
        const {
            category, subsidyName, shortInfo, briefInfo, objective,
            eligibility, benefits, documentsRequired, applicationProcess,
            beneficiaryStatus, importantConsiderations, officialWebsite
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        cloudinary.uploader.upload_stream(
            { folder: 'subsidies' },
            async (error, result) => {
                if (error) return res.status(500).json({ error: error.message });

                const newSubsidy = new Subsidy({
                    category,
                    subsidyName,
                    image: result.secure_url,
                    shortInfo,
                    briefInfo,
                    objective,
                    eligibility,
                    benefits ,
                    documentsRequired,
                    applicationProcess,
                    beneficiaryStatus,
                    importantConsiderations,
                    officialWebsite
                });

                await newSubsidy.save();
                return res.status(201).json({ message: 'Subsidy added successfully', subsidy: newSubsidy });
            }
        ).end(req.file.buffer);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Get all subsidies
const getSubSidies = async (req, res) => {
    try {
        const subsidies = await Subsidy.find();
        return res.status(200).json(subsidies);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

// Edit a subsidy
const editSubSidies = async (req, res) => {
    try {
        const subsidyId = req.params.id;
        
        // Initialize update object with text fields from either body or form-data
        const updateData = {
            category: req.body.category,
            subsidyName: req.body.subsidyName,
            shortInfo: req.body.shortInfo,
            briefInfo: req.body.briefInfo,
            objective: req.body.objective,
            eligibility: req.body.eligibility,
            benefits: req.body.benefits,
            documentsRequired: req.body.documentsRequired,
            applicationProcess: req.body.applicationProcess,
            beneficiaryStatus: req.body.beneficiaryStatus,
            importantConsiderations: req.body.importantConsiderations,
            officialWebsite: req.body.officialWebsite
        };

        // Handle image upload if a new file was provided
        if (req.file) {
            // Upload new image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'subsidies' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });
            updateData.image = result.secure_url;
        }

        // Update the subsidy in the database
        const updatedSubsidy = await Subsidy.findByIdAndUpdate(
            subsidyId,
            updateData,
            { new: true }
        );

        if (!updatedSubsidy) {
            return res.status(404).json({ error: 'Subsidy not found' });
        }

        return res.status(200).json({ 
            message: 'Subsidy updated successfully', 
            subsidy: updatedSubsidy 
        });
    } catch (e) {
        console.error("Error updating subsidy:", e);
        return res.status(500).json({ 
            error: e.message || 'Failed to update subsidy' 
        });
    }
};
// Delete a subsidy
const deleteSubsidies = async (req, res) => {
    try {
        const subsidyId = req.params.id;
        const deletedSubsidy = await Subsidy.findByIdAndDelete(subsidyId);

        if (!deletedSubsidy) return res.status(404).json({ error: 'Subsidy not found' });

        return res.status(200).json({ message: 'Subsidy deleted successfully' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    addSubSidies,
    getSubSidies,
    editSubSidies,
    deleteSubsidies
};
