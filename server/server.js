import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./src/config/db.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import customResponse from "./src/middlewares/customResponse.js";
// import { httpLogger } from "./src/middlewares/logger.js";
import limiter from "./src/middlewares/rateLimit.js";
import helemt from "helmet";

dotenv.config();
connectDB();

const app = express();
// app.use(httpLogger);
app.use(limiter);
app.use(helemt());
app.use(customResponse);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
