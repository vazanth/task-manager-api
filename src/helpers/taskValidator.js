const Joi = require('joi');

const priorityEnum = ['Low', 'Medium', 'High'];

const sortEnum = ['asc', 'desc'];

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: false,
    },
  },
};

const customMessages = {
  'string.base': 'The {{#label}} field should be a string',
  'boolean.base': 'The {{#label}} field should be a boolean',
  'any.required': 'The {{#label}} field is required',
  'any.only': 'The {{#label}} field must be one of {{#valids}}',
};

const taskBodySchema = Joi.object({
  title: Joi.string().required().messages(customMessages),
  description: Joi.string().required().messages(customMessages),
  completed: Joi.boolean().strict().required().messages(customMessages),
  priority: Joi.string()
    .required()
    .insensitive()
    .valid(...priorityEnum)
    .messages(customMessages),
});

const tasksQuerySchema = Joi.object({
  completed: Joi.boolean().messages(customMessages),
  date: Joi.string()
    .valid(...sortEnum)
    .insensitive()
    .messages({
      'any.only': 'The {{#label}} field must be one of {{#valids}}',
    }),
});

// const tasksPathSchema = Joi.object({
//   taskId: Joi.string().alphanum().length(24).required(),
// });

module.exports = { taskBodySchema, tasksQuerySchema, options };
