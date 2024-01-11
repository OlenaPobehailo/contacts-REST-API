const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required.",
    "string.empty": "The name cannot be empty",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "The email cannot be empty",
    "string.email": "Invalid email format.",
    "any.required": "Email is required. ",
  }),

  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.empty": "The phone number cannot be empty",
      "string.pattern.base": "Invalid phone number format.",
      "any.required": "Phone number is required.",
    }),

  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite status is required.",
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'Missing field favorite',
  }),
});

module.exports = {
  createContactSchema,
  updateFavoriteSchema,
};
