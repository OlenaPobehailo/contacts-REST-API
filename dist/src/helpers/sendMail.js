"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
};
const transporter = nodemailer_1.default.createTransport(config);
const sendEmail = async (data) => {
    try {
        const emailOptions = {
            ...data,
            from: process.env.GMAIL_USER,
        };
        console.log("emailOptions.from", emailOptions.from);
        const info = await transporter.sendMail(emailOptions);
        console.log(info);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.sendEmail = sendEmail;
// sendEmail({
//   to: "xisoye7326@tanlanav.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// });
// module.exports = sendEmail;
