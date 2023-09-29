const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  getTaskByPriority,
  updateTaskById,
  deleteTask,
} = require('../controllers/taskController');
const {
  validateRequestBody,
  validateQueryParams,
  validateTaskId,
} = require('../middleware/validateParamsAndBody');
const readFileMiddleware = require('../middleware/readFileMiddleware');

const router = express.Router();

router
  .route('/tasks')
  .get(validateQueryParams, readFileMiddleware, getTasks)
  .post(validateRequestBody, readFileMiddleware, createTask);

router
  .route('/tasks/:taskId')
  .get(validateTaskId, readFileMiddleware, getTaskById)
  .put(validateRequestBody, readFileMiddleware, updateTaskById)
  .delete(validateTaskId, readFileMiddleware, deleteTask);

router.get('/tasks/priority/:level', readFileMiddleware, getTaskByPriority);

module.exports = router;
