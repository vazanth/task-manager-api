const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const responseMiddleware = require('./middleware/responseMiddleware');

const app = express();

// middleware for parsing request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// common response middlware for both success and error response
app.use(responseMiddleware);

// api routes
app.use('/', taskRouter);

module.exports = app;
