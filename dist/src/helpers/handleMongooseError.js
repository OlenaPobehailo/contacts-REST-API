"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseError = void 0;
const handleMongooseError = (error, data, next) => {
    const { name, code } = error;
    const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
    error.status = status;
    next();
};
exports.handleMongooseError = handleMongooseError;
