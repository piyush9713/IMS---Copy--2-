import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return res.error("Unauthorized", 401);
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = await User.findById(decoded.userId).select("-password");
  next();
});
