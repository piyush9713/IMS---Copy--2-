import User from "../models/User.js";
import Company from "../models/Company.js";
import { generateAccessToken } from "../utils/generateToken.js";
import { sendOTP, verifyOTP } from "../utils/otpService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// OTP Send Controller
export const sendOTPController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await User.findOne({ email }).select("-password");
  await sendOTP(email);
  res.success("OTP sent");
});

// OTP Verify Controller
export const verifyOTPController = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!(await verifyOTP(email, otp))) return res.error("Invalid OTP", 401);
  let user = await User.findOne({ email }).select("-password");
  if (user) {
    const accessToken = generateAccessToken(res, user._id);
    return res.success("Login successful", { accessToken, user });
  }
  res.success("OTP verified, proceed to registration", { newUser: true });
});

// Register User Controller
export const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    username,
    phone,
    password,
    companyName,
    companyAddress,
    industry,
  } = req.body;

  const existingUser = await User.findOne({ email }).select("-password");
  if (existingUser) {
    return res.error("Email already exists");
  }
  const company = new Company({
    name: companyName,
    address: companyAddress,
    industry,
  });
  await company.save();
  const newUser = new User({
    email,
    username,
    phone,
    password,
    verified: true,
    companyId: company._id,
  });
  await newUser.save();
  const accessToken = generateAccessToken(res, newUser._id);
  const user = await User.findOne({ email }).select("-password");
  res.success("User registered successfully", { accessToken, user });
});

// Login User Controller
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.error("Invalid Credentials", 401);
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) return res.error("Invalid Credentials", 401);
  const accessToken = generateAccessToken(res, user._id);
  const loggedInUser = await User.findOne({ email }).select("-password");
  res.success("Logged in successfully", { accessToken, user: loggedInUser });
});

// Logout User Controller
export const logoutUser = async (req, res) => {
  res.clearCookie("accessToken");
  res.success("Logged out successfully");
};

// Get User Controller
export const getUser = async (req, res) => {
  res.success("User exists", { user: req.user });
};

// Refresh Token Controller
export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.error("Refresh token required", 401);
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) return res.error("Invalid refresh token", 403);
  const newAccessToken = generateAccessToken(decoded.userId);
  res.success("token refreshed", { accessToken: newAccessToken });
};
