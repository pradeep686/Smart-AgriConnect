const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addFertilizer,
    getFertilizer,
    editFertilizer,
    deleteFertilizer } = require('../controller/fertilizerController');
const protect=require('../middleware/authMiddleware')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get',getFertilizer );
router.post('/add', upload.single('image'), addFertilizer);
router.put('/edit/:id', upload.single('image'), editFertilizer);
router.delete('/delete/:id', deleteFertilizer);

module.exports = router;
