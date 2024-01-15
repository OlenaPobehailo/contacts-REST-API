"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const { handleMongooseError } = require("../helpers");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        // required: [true, "Verify token is required"],
        default: "",
    },
}, {
    versionKey: false,
    timestamps: true,
});
userSchema.post("save", handleMongooseError);
const User = (0, mongoose_1.model)("user", userSchema);
exports.User = User;
