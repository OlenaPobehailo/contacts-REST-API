"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = yield User.findById(id);
        if (!user || !user.token || user.token !== token) {
            return next(HttpError(401));
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(HttpError(401));
    }
});
module.exports = authenticate;
