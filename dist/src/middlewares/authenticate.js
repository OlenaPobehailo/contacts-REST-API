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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const user_1 = require("../models/user");
const { SECRET_KEY } = process.env;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next((0, helpers_1.HttpError)(401));
    }
    if (!SECRET_KEY) {
        return next((0, helpers_1.HttpError)(500, "Server misconfiguration: No secret key found."));
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = yield user_1.User.findById(id);
        if (!user || !user.token || user.token !== token) {
            return next((0, helpers_1.HttpError)(401));
        }
        // req.user = user;
        req.user = {
            _id: user._id.toString(),
            email: user.email,
            subscription: user.subscription,
        };
        next();
    }
    catch (error) {
        next((0, helpers_1.HttpError)(401));
    }
});
exports.authenticate = authenticate;
