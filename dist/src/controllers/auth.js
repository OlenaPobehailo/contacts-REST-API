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
exports.authController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gravatar_1 = __importDefault(require("gravatar"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const nanoid_1 = require("nanoid");
const user_1 = require("../models/user");
const helpers_1 = require("../helpers");
const decorators_1 = require("../decorators");
const SECRET_KEY = process.env.SECRET_KEY || "";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
if (!SECRET_KEY) {
    console.error("SECRET_KEY is not defined.");
    process.exit(1);
}
const avatarsDir = path_1.default.join(__dirname, "../", "public", "avatars");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ email });
    if (user) {
        throw (0, helpers_1.HttpError)(409, "Email in use");
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const avatarURL = gravatar_1.default.url(email);
    const verificationToken = (0, nanoid_1.nanoid)();
    const newUser = yield user_1.User.create(Object.assign(Object.assign({}, req.body), { password: hashPassword, avatarURL,
        verificationToken }));
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify email</a>`,
    };
    yield (0, helpers_1.sendEmail)(verifyEmail);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
});
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationToken } = req.params;
    const user = yield user_1.User.findOne({ verificationToken });
    if (!user) {
        throw (0, helpers_1.HttpError)(404, "User not found");
    }
    yield user_1.User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });
    res.status(200).json({
        message: "Verification successful",
    });
});
const resendVerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        throw (0, helpers_1.HttpError)(401, "Email not found");
    }
    if (user.verify) {
        throw (0, helpers_1.HttpError)(400, "Verification has already been passed");
    }
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify email</a>`,
    };
    yield (0, helpers_1.sendEmail)(verifyEmail);
    res.status(200).json({
        message: "Verification email sent",
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        throw (0, helpers_1.HttpError)(401, "Email or password is wrong");
    }
    if (!user.verify) {
        throw (0, helpers_1.HttpError)(401, "Email not verified");
    }
    const passwordCompare = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordCompare) {
        throw (0, helpers_1.HttpError)(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    yield user_1.User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email,
            subscription: user.subscription,
        },
    });
});
const getCurrent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, subscription } = req.user || {};
    res.json({
        email,
        subscription,
    });
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user || {};
    yield user_1.User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({
        message: "Logout success",
    });
});
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user || {};
    const { path: tempUpload, originalname } = req.file || {};
    console.log("tempUpload", tempUpload);
    if (!tempUpload) {
        return res.status(400).json({ message: "Invalid file upload" });
    }
    const filename = `${_id}_${originalname}`;
    const resultUpload = path_1.default.join(avatarsDir, filename);
    console.log("resultUpload", resultUpload);
    try {
        yield promises_1.default.rename(tempUpload, resultUpload);
        const avatarURL = path_1.default.join("avatars", filename);
        yield user_1.User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating avatar" });
    }
});
exports.authController = {
    register: (0, decorators_1.ctrlWrapper)(register),
    verifyEmail: (0, decorators_1.ctrlWrapper)(verifyEmail),
    resendVerifyEmail: (0, decorators_1.ctrlWrapper)(resendVerifyEmail),
    login: (0, decorators_1.ctrlWrapper)(login),
    getCurrent: (0, decorators_1.ctrlWrapper)(getCurrent),
    logout: (0, decorators_1.ctrlWrapper)(logout),
    updateAvatar: (0, decorators_1.ctrlWrapper)(updateAvatar),
};
