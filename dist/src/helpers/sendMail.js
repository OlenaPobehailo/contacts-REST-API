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
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailOptions = Object.assign(Object.assign({}, data), { from: process.env.GMAIL_USER });
        console.log("emailOptions.from", emailOptions.from);
        const info = yield transporter.sendMail(emailOptions);
        console.log(info);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.sendEmail = sendEmail;
// sendEmail({
//   to: "xisoye7326@tanlanav.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// });
// module.exports = sendEmail;
