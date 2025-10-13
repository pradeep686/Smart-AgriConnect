const express = require("express");
const feedbackController = require("../controller/feedbackController");

const router = express.Router();

router.get("/all", feedbackController.getAllFeedback);
router.put("/resolve/:id", feedbackController.resolveFeedback);
router.put("/unresolve/:id", feedbackController.unresolveFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);
router.post("/submit",feedbackController.postFeedback)
module.exports = router;
