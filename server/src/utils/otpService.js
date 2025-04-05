import nodemailer from "nodemailer";
import "dotenv/config";
import OTP from "../models/OTP.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (email) => {
  const otp = generateOTP();

  await OTP.create({ email, otp });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send OTP");
  }
  return otp;
};

export const verifyOTP = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });

  if (
    !otpRecord ||
    otpRecord.createdAt < new Date(Date.now() - 5 * 60 * 1000)
  ) {
    return false;
  }

  await OTP.deleteOne({ email });
  return true;
};
