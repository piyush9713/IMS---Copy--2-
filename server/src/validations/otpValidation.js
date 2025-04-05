import { z } from "zod";

export const otpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  otp: z
    .string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must contain only digits" }),
});
