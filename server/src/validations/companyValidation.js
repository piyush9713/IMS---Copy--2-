import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters long" }),
  address: z.string().optional(),
  industry: z.string().optional(),
});
