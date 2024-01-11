const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const verifySchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'missing required field email',
  }),
});


module.exports = {
  registerSchema,
  loginSchema,
  verifySchema,
};
