const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCropInsights,
    getCropInsights,
    editCropInsights,
    deleteCropInsights } = require('../controller/cropInsightController');
const protect=require('../middleware/authMiddleware')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get', getCropInsights);
router.post('/add', upload.single('image'), addCropInsights);
router.put('/edit/:id', upload.single('image'), editCropInsights);
router.delete('/delete/:id', deleteCropInsights);

module.exports = router;
