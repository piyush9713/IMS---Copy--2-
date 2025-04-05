import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  verifyOTPController,
  sendOTPController,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { otpSchema } from "../validations/otpValidation.js";
import { loginSchema, registerSchema } from "../validations/userValidation.js";

const router = express.Router();

router.post("/send-otp", sendOTPController);
router.post("/verify-otp", validate(otpSchema), verifyOTPController);
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/get-user", protect, getUser);

export default router;
