const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Apost must have an image'],
  },
  content: {
    type: String,
    required: [true, 'A post must have content'],
  },
  category: {
    type: String,
    required: [true, 'A post must have a category'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A post must belong to a user'],
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
