"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../controllers/auth");
const express_1 = __importDefault(require("express"));
const decorators_1 = require("../../decorators");
const validators_1 = require("../../validators");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.post("/signup", (0, decorators_1.validateBody)(validators_1.authSchemas.registerSchema), auth_1.authController.register);
router.get("/verify/:verificationToken", auth_1.authController.verifyEmail);
router.post("/verify", (0, decorators_1.validateBody)(validators_1.authSchemas.verifySchema), auth_1.authController.resendVerifyEmail);
router.post("/login", (0, decorators_1.validateBody)(validators_1.authSchemas.loginSchema), auth_1.authController.login);
router.get("/current", middlewares_1.authenticate, auth_1.authController.getCurrent);
router.post("/logout", middlewares_1.authenticate, auth_1.authController.logout);
router.patch("/avatars", middlewares_1.authenticate, middlewares_1.upload.single("avatar"), auth_1.authController.updateAvatar);
exports.default = router;
