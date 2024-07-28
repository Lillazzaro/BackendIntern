const User = require('../model/userModel');
const catchAsync = require('../Utils/catchAsync');

// Create new user
exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Get all users created
exports.getUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
