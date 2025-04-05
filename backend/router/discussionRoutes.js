const express = require('express');
const router = express.Router();
const {
  createDiscussion,
  getAllDiscussions,
  getUserDiscussions,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addReply,
  deleteReply
} = require('../controller/discussionController');
const { protect } = require('../middleware/userLoginMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getAllDiscussions)
  .post(protect, upload.single('image'), createDiscussion);

router.route('/my-discussions')
  .get(protect, getUserDiscussions);

router.route('/:id')
  .get(getDiscussion)
  .put(protect, upload.single('image'), updateDiscussion)
  .delete(protect, deleteDiscussion);

router.route('/:id/replies')
  .post(protect, addReply);

router.route('/:id/replies/:replyId')
  .delete(protect, deleteReply);

module.exports = router;