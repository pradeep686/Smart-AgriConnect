const express = require('express');
const router = express.Router();
const multer = require('multer');

// Import controller functions
const {
    addPesticides,
    getPesticides,
    editPesticides,
    deletePesticides
} = require('../controller/pestcideController');

// Optional: Middleware for auth (if needed)
const protect = require('../middleware/authMiddleware');

// Set up memory storage for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get('/get', getPesticides);
router.post('/add', upload.single('images'), addPesticides);
router.put('/edit/:id', upload.single('images'), editPesticides);
router.delete('/delete/:id', deletePesticides);

module.exports = router;
