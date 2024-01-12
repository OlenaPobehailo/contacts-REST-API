"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchemas = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    subscription: joi_1.default.string(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
const verifySchema = joi_1.default.object({
    email: joi_1.default.string().required().messages({
        "any.required": "missing required field email",
    }),
});
exports.authSchemas = {
    registerSchema,
    loginSchema,
    verifySchema,
};
