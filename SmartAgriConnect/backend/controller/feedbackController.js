const Feedback = require("../models/feedbackModel");

const feedbackController = {};

// Get all feedbacks
feedbackController.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Resolve Feedback (Mark as Resolved)
feedbackController.resolveFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndUpdate(id, { resolved: true }, { new: true });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback marked as resolved", feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unresolve Feedback (Mark as Unresolved)
feedbackController.unresolveFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndUpdate(id, { resolved: false }, { new: true });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback marked as unresolved", feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

feedbackController.deleteFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      const feedback = await Feedback.findByIdAndDelete(id);
  
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
  
      res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  feedbackController.postFeedback=async(req,res)=>{
    try{
        const{name,email,category,description,rating,resolved}=req.body
        const feedback=new Feedback({name,email,category,description,rating,resolved})
        await feedback.save()
        res.status(201).json({message:"Feedback created successfully",feedback})
    }
    catch(e){
      return res.status(500).json({ message: "Server error", err:e.message });
    }
  }

module.exports = feedbackController;
