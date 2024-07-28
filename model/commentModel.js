const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A comment should have content'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A comment must have a user'],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'A comment must belong to a post'],
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
