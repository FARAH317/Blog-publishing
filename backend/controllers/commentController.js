const mongoose=require('mongoose');
const Comment=require('../models/Comment');
const Post=require('../models/Post');
const getCommentsForPost=async (request, response)=> {
  const { postId }=request.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return response.status(400).json({ message: 'Invalid post id' });
  }
  try {
    const comments=await Comment.find({ post: postId })
      .populate('author', 'name')
      .sort({ createdAt: 1 });
    response.json(comments);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch comments' });
  }
};
const createComment=async (request, response)=> {
  const { postId }=request.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return response.status(400).json({ message: 'Invalid post id' });
  }
  try {
    const { content }=request.body;
    if (!content || !content.trim()) {
      return response.status(400).json({ message: 'Comment cannot be empty' });
    }
    const post=await Post.findById(postId);
    if (!post) {
      return response.status(404).json({ message: 'Post not found' });
    }
    const newComment=await Comment.create({
      content,
      author: request.user._id,
      post: postId,
    });
    const populatedComment=await newComment.populate('author', 'name');
    response.status(201).json(populatedComment);
  } catch (error) {
    response.status(500).json({ message: 'Failed to add comment' });
  }
};
const deleteComment=async (request, response)=> {
  const { commentId }=request.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: 'Invalid comment id' });
  }
  try {
    const comment=await Comment.findById(commentId);
    if (!comment) {
      return response.status(404).json({ message: 'Comment not found' });
    }
    if (comment.author.toString() !== request.user._id.toString()) {
      return response.status(403).json({ message: 'You can only delete your own comments' });
    }
    await comment.deleteOne();
    response.json({ message: 'Comment deleted' });
  } catch (error) {
    response.status(500).json({ message: 'Failed to delete comment' });
  }
};
module.exports={ getCommentsForPost, createComment, deleteComment };
