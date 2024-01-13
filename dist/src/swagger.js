"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Documentation",
            version: "1.0.0",
            description: "Description of your API",
        },
    },
    apis: ["./*/api/contacts.js"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
console.log(JSON.stringify(swaggerSpec, null, 2));
exports.default = swaggerSpec;
