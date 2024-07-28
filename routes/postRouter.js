const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router
  .route('/posts')
  .get(postController.getPosts)
  .post(postController.createPost);

router
  .route('/posts/:id')
  .get(postController.getPost)
  .patch(postController.editPost)
  .delete(postController.deletePost);

router.post('/posts/:id/upvote', postController.upvotePost);
router.post('/posts/:id/downvote', postController.downvotePost);

module.exports = router;
