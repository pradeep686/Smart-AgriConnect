const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addSubSidies, getSubSidies, editSubSidies, deleteSubsidies } = require('../controller/subsidiesController');
const protect=require('../middleware/authMiddleware')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get', getSubSidies);
router.post('/add', upload.single('image'), addSubSidies);
router.put('/edit/:id', upload.single('image'), editSubSidies);
router.delete('/delete/:id', deleteSubsidies);

module.exports = router;
