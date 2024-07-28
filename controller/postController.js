const Post = require('../model/postModel');
const User = require('../model/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');

// Create Posts
exports.createPost = catchAsync(async (req, res, next) => {
  const { userId, image, content, category } = req.body;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found with that ID', 404));
  }
  const post = await Post.create({ image, content, category, user: userId });

  res.status(201).json({
    status: 'Success',
    data: {
      post,
    },
  });
});

// Get all posts made by the user
exports.getPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

// Get a specific post made by the user
exports.getPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  // Check if post exists
  if (!post) {
    return next(new AppError('No Post Found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

// Edit post
exports.editPost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { image, content, category } = req.body;
  const post = await Post.findByIdAndUpdate(id, { image, content, category });

  // Check if post exists
  if (!post) {
    return next(new AppError('No Post Found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

// Delete post
exports.deletePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);

  // Check if post exists
  if (!post) {
    return next(new AppError('No Post Found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: 'Sucessfully Deleted',
  });
});

// Upvote a post
exports.upvotePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  // Check if post exists
  if (!post) {
    return next(new AppError('No Post Found with that ID', 404));
  }
  // Check if user has voted
  const user = post.user;
  if (post.voters.includes(user))
    return res.status(400).json({ message: 'You have already voted' });

  // Increase number of upvote
  post.upvotes++;
  // Add the user to array of users that have voted
  post.voters.push(user);
  await post.save();

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

// Downvote a post
exports.downvotePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  //   Check if posts exists
  if (!post) {
    return next(new AppError('No Post Found with that ID', 404));
  }

  //   Check if user has voted or not
  const user = post.user;
  if (post.voters.includes(user))
    return res.status(400).json({ message: 'You have already voted' });

  // Increase number of downvotes
  post.downvotes++;
  // Add user to array of users that have voted
  post.voters.push(user);
  await post.save();

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});
