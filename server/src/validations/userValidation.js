import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["admin", "manager", "staff"]).default("manager"),
  verified: z.boolean(),
  companyId: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Invalid Credentials" }),
});
