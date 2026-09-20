const mongoose=require('mongoose');
const Post=require('../models/Post');
const getPosts=async (request, response)=> {
  try {
    const { search }=request.query;
    const query=search ? { $text: { $search: search } } : {};
    const posts=await Post.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    response.json(posts);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch posts' });
  }
};
const getPostById=async (request, response)=> {
  const { id }=request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: 'Invalid post id' });
  }
  try {
    const post=await Post.findById(id).populate('author', 'name');
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }
    response.json(post);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch post' });
  }
};
const createPost=async (request, response)=> {
  try {
    const { title, content }=request.body;
    if (!title || !content) {
      return response.status(400).json({ message: 'Title and content are required' });
    }
    const newPost=await Post.create({
      title,
      content,
      author: request.user._id,
    });
    const populatedPost=await newPost.populate('author', 'name');
    response.status(201).json(populatedPost);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return response.status(400).json({ message: error.message });
    }
    response.status(500).json({ message: 'Failed to create post' });
  }
};
const updatePost=async (request, response)=> {
  const { id }=request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: 'Invalid post id' });
  }
  try {
    const post=await Post.findById(id);
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== request.user._id.toString()) {
      return response.status(403).json({ message: 'You can only edit your own posts' });
    }
    const { title, content }=request.body;
    if (!title || !content) {
      return response.status(400).json({ message: 'Title and content are required' });
    }
    post.title=title;
    post.content=content;
    await post.save();
    const populatedPost=await post.populate('author', 'name');
    response.json(populatedPost);
  } catch (error) {
    response.status(500).json({ message: 'Failed to update post' });
  }
};
const deletePost=async (request, response)=> {
  const { id }=request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: 'Invalid post id' });
  }
  try {
    const post=await Post.findById(id);
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== request.user._id.toString()) {
      return response.status(403).json({ message: 'You can only delete your own posts' });
    }
    await post.deleteOne();
    response.json({ message: 'Post deleted' });
  } catch (error) {
    response.status(500).json({ message: 'Failed to delete post' });
  }
};
module.exports={ getPosts, getPostById, createPost, updatePost, deletePost };
