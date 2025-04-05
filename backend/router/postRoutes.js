const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const {protect} = require('../middleware/userLoginMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('image'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/my-posts', protect, postController.getUserPosts);
router.put('/:id', protect, upload.single('image'), postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router;