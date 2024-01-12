"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const errorMessageList = {
    400: "Bad Request",
    401: "Not authorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
};
const HttpError = (status, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
exports.HttpError = HttpError;
