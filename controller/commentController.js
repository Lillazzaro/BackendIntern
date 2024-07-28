const Comment = require('../model/commentModel');
const Post = require('../model/postModel');
const User = require('../model/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

exports.createComment = catchAsync(async (req, res, next) => {
  const { postId, userId, content } = req.body;

  // Check if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError('Post not found with that ID', 404));
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found with that ID', 404));
  }
  // Create the comment
  const comment = await Comment.create({ content, post: postId, user: userId });

  res.status(200).json({
    status: 'success',
    data: comment,
  });
});

exports.getComments = catchAsync(async (req, res) => {
  const comments = await Comment.find();

  res.status(201).json({
    status: 'success',
    data: comments,
  });
});
