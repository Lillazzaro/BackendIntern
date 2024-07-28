const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router
  .route('/users')
  .get(userController.getUser)
  .post(userController.createUser);

module.exports = router;
