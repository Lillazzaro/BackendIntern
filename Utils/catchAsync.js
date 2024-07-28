module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// This catches any async/await error that may occur in the function
