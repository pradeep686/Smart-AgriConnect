const Discussion = require('../models/discussionModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const cloudinary = require('../config/cloudinaryConfig');

// @desc    Create new discussion
// @route   POST /api/discussions
// @access  Private
exports.createDiscussion = asyncHandler(async (req, res, next) => {
  const { title, tags, content } = req.body;
  const tagsArray = tags.split(',').map(tag => tag.trim());

  let imageData = {};
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'discussions',
      width: 800,
      crop: "scale"
    });

    imageData = {
      public_id: result.public_id,
      url: result.secure_url
    };
  }

  const discussion = await Discussion.create({
    user: req.user.id,
    name: req.user.name,
    title,
    tags: tagsArray,
    content,
    image: imageData
  });

  res.status(201).json({
    success: true,
    data: discussion
  });
});

// @desc    Get all discussions
// @route   GET /api/discussions
// @access  Public
exports.getAllDiscussions = asyncHandler(async (req, res, next) => {
  const discussions = await Discussion.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: discussions.length,
    data: discussions
  });
});

// @desc    Get user's discussions
// @route   GET /api/discussions/my-discussions
// @access  Private
exports.getUserDiscussions = asyncHandler(async (req, res, next) => {
  const discussions = await Discussion.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: discussions.length,
    data: discussions
  });
});

// @desc    Get single discussion
// @route   GET /api/discussions/:id
// @access  Public
exports.getDiscussion = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);

  if (!discussion) {
    return next(new ErrorResponse(`Discussion not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: discussion
  });
});

// @desc    Update discussion
// @route   PUT /api/discussions/:id
// @access  Private
exports.updateDiscussion = asyncHandler(async (req, res, next) => {
  let discussion = await Discussion.findById(req.params.id);

  if (!discussion) {
    return next(new ErrorResponse(`Discussion not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is discussion owner
  if (discussion.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this discussion`, 401));
  }

  // Handle image update
  let imageData = discussion.image;
  if (req.file) {
    // Delete old image if exists
    if (discussion.image.public_id) {
      await cloudinary.uploader.destroy(discussion.image.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'discussions',
      width: 800,
      crop: "scale"
    });

    imageData = {
      public_id: result.public_id,
      url: result.secure_url
    };
  }

  const { title, tags, content } = req.body;
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : discussion.tags;

  discussion = await Discussion.findByIdAndUpdate(req.params.id, {
    title: title || discussion.title,
    tags: tagsArray,
    content: content || discussion.content,
    image: imageData
  }, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: discussion
  });
});

// @desc    Delete discussion
// @route   DELETE /api/discussions/:id
// @access  Private
exports.deleteDiscussion = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);

  if (!discussion) {
    return next(new ErrorResponse(`Discussion not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is discussion owner or admin
  if (discussion.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this discussion`, 401));
  }

  // Delete image from cloudinary if exists
  if (discussion.image.public_id) {
    await cloudinary.uploader.destroy(discussion.image.public_id);
  }

  await discussion.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add reply to discussion
// @route   POST /api/discussions/:id/replies
// @access  Private
exports.addReply = asyncHandler(async (req, res, next) => {
  const { content } = req.body;

  const discussion = await Discussion.findById(req.params.id);

  if (!discussion) {
    return next(new ErrorResponse(`Discussion not found with id of ${req.params.id}`, 404));
  }

  const reply = {
    user: req.user.id,
    name: req.user.name,
    content
  };

  discussion.replies.push(reply);
  await discussion.save();

  res.status(200).json({
    success: true,
    data: discussion
  });
});

// @desc    Delete reply
// @route   DELETE /api/discussions/:id/replies/:replyId
// @access  Private
exports.deleteReply = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);

  if (!discussion) {
    return next(new ErrorResponse(`Discussion not found with id of ${req.params.id}`, 404));
  }

  // Find reply
  const reply = discussion.replies.find(
    reply => reply._id.toString() === req.params.replyId
  );

  if (!reply) {
    return next(new ErrorResponse(`Reply not found with id of ${req.params.replyId}`, 404));
  }

  // Make sure user is reply owner or admin
  if (reply.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this reply`, 401));
  }

  discussion.replies = discussion.replies.filter(
    reply => reply._id.toString() !== req.params.replyId
  );

  await discussion.save();

  res.status(200).json({
    success: true,
    data: discussion
  });
});