const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

router
  .route('/comments')
  .post(commentController.createComment)
  .get(commentController.getComments);

module.exports = router;
