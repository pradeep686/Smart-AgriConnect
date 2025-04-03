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
                    category: category || "General",
                    subsidyName: subsidyName || "No Name",
                    image: result.secure_url,
                    shortInfo: shortInfo || "No Short Info",
                    briefInfo: briefInfo || "No Brief Info",
                    objective: objective || "No Objective",
                    eligibility: safeParseJSON(eligibility),
                    benefits: safeParseJSON(benefits),
                    documentsRequired: safeParseJSON(documentsRequired),
                    applicationProcess: safeParseJSON(applicationProcess),
                    beneficiaryStatus: safeParseJSON(beneficiaryStatus),
                    importantConsiderations: safeParseJSON(importantConsiderations),
                    officialWebsite: officialWebsite || "No Website"
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
        const {
            category, subsidyName, shortInfo, briefInfo, objective,
            eligibility, benefits, documentsRequired, applicationProcess,
            beneficiaryStatus, importantConsiderations, officialWebsite
        } = req.body;

        let imageUrl;
        if (req.file) {
            cloudinary.uploader.upload_stream(
                { folder: 'subsidies' },
                async (error, result) => {
                    if (error) return res.status(500).json({ error: error.message });
                    imageUrl = result.secure_url;
                }
            ).end(req.file.buffer);
        }

        const updatedSubsidy = await Subsidy.findByIdAndUpdate(
            subsidyId,
            {
                category: category || "General",
                subsidyName: subsidyName || "No Name",
                image: imageUrl || undefined,
                shortInfo: shortInfo || "No Short Info",
                briefInfo: briefInfo || "No Brief Info",
                objective: objective || "No Objective",
                eligibility: safeParseJSON(eligibility),
                benefits: safeParseJSON(benefits),
                documentsRequired: safeParseJSON(documentsRequired),
                applicationProcess: safeParseJSON(applicationProcess),
                beneficiaryStatus: safeParseJSON(beneficiaryStatus),
                importantConsiderations: safeParseJSON(importantConsiderations),
                officialWebsite: officialWebsite || "No Website"
            },
            { new: true }
        );

        if (!updatedSubsidy) return res.status(404).json({ error: 'Subsidy not found' });

        return res.status(200).json({ message: 'Subsidy updated successfully', subsidy: updatedSubsidy });
    } catch (e) {
        return res.status(500).json({ error: e.message });
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
