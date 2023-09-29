const { readFile, filepath } = require('../helpers/fileOperations');
const {
  options,
  taskBodySchema,
  tasksQuerySchema,
} = require('../helpers/taskValidator');

function validateRequestBody(req, res, next) {
  const { error: bodyError } = taskBodySchema.validate(req.body, options);
  if (bodyError) {
    const invalidFields = bodyError.details
      .map((detail) => detail.message)
      .join(', ');
    res.sendError(invalidFields, 400);
    return;
  }

  next();
}

function validateQueryParams(req, res, next) {
  const { error: queryError } = tasksQuerySchema.validate(req.query, options);

  if (queryError) {
    const invalidFields = queryError.details
      .map((detail) => detail.message)
      .join(', ');
    res.sendError(invalidFields, 400);
    return;
  }
  next();
}

async function validateTaskId(req, res, next) {
  const taskId = req.params.taskId;
  try {
    const resource = await readFile(filepath);
    const isExist = resource.tasks.find((item) => item.id === taskId);
    if (isExist) {
      next();
    } else {
      res.sendError('File does not exist for the id provided', 400);
    }
  } catch (error) {
    res.sendError(error.message, 500);
  }
}

module.exports = { validateRequestBody, validateQueryParams, validateTaskId };
