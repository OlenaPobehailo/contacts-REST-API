import { authController } from "../../controllers/auth";
import express from "express";

import { validateBody } from "../../decorators";
import { authSchemas } from "../../validators";
import { authenticate, upload } from "../../middlewares";

const router = express.Router();

router.post(
  "/signup",
  validateBody(authSchemas.registerSchema),
  authController.register
);

router.get("/verify/:verificationToken", authController.verifyEmail);

router.post(
  "/verify",
  validateBody(authSchemas.verifySchema),
  authController.resendVerifyEmail
);

router.post(
  "/login",
  validateBody(authSchemas.loginSchema),
  authController.login
);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default router;
