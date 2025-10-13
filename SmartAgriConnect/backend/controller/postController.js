const Post = require('../models/postModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { name, title, tags, content } = req.body;
    const userId = req.user;
    
    const newPost = new Post({
      userId,
      name,
      title,
      tags: tags.split(',').map(tag => tag.trim()),
      content,
      image: req.file ? req.file.path : null
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts by user
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { name, title, tags, content } = req.body;
    const post = await Post.findOne({ _id: req.params.id, userId: req.user });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    post.name = name || post.name;
    post.title = title || post.title;
    post.tags = tags ? tags.split(',').map(tag => tag.trim()) : post.tags;
    post.content = content || post.content;
    post.image = req.file ? req.file.path : post.image;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};