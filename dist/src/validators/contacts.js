"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchemas = void 0;
const joi_1 = __importDefault(require("joi"));
const createContactSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "any.required": "Name is required.",
        "string.empty": "The name cannot be empty",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "The email cannot be empty",
        "string.email": "Invalid email format.",
        "any.required": "Email is required. ",
    }),
    phone: joi_1.default.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required()
        .messages({
        "string.empty": "The phone number cannot be empty",
        "string.pattern.base": "Invalid phone number format.",
        "any.required": "Phone number is required.",
    }),
    favorite: joi_1.default.boolean().required().messages({
        "any.required": "Favorite status is required.",
    }),
});
const updateFavoriteSchema = joi_1.default.object({
    favorite: joi_1.default.boolean().required().messages({
        "any.required": "Missing field favorite",
    }),
});
exports.contactSchemas = {
    createContactSchema,
    updateFavoriteSchema,
};
