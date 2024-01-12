"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(contactId)) {
        return next((0, helpers_1.HttpError)(400, `${contactId} is not a valid id`));
    }
    next();
};
exports.isValidId = isValidId;
