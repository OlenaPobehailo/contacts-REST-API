"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const { handleMongooseError } = require("../helpers");
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    versionKey: false,
    timestamps: true,
});
contactSchema.post("save", handleMongooseError);
const Contact = (0, mongoose_1.model)("contact", contactSchema);
exports.Contact = Contact;
