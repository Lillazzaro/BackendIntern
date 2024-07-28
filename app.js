const express = require('express');
const postRoutes = require('./routes/postRouter');
const commentRoutes = require('./routes/commentRouter');
const userRoutes = require('./routes/userRouter');

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', commentRoutes);

module.exports = app;
