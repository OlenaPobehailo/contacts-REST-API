import Joi from "joi";

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
    "any.required": "missing required field email",
  }),
});

export const authSchemas = {
  registerSchema,
  loginSchema,
  verifySchema,
};
