import { z } from "zod";
export const formFilterSchema = z.object({
  categories: z.array(z.string()),
});

export const formFilterCompanySchema = z.object({
  industry: z.array(z.string()),
});

export const formApplySchema = z.object({
  resume: z.any().refine((file: any) => file?.name, "Please upload Resume"),
  fullname: z
    .string({ required_error: "Full name is required" })
    .min(5, { message: "Full name have min 5 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email not valid" }),
  phone: z.string().min(6, { message: "Phone number have min 6 characters" }),
  previousJobTitle: z.string(),
  linkedIn: z.string(),
  portfolio: z.string(),
  coverLetter: z.string(),
});

export const formSignInSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const formSignUpSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email not valid" }),
  password: z.string({ required_error: "Password is required" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name have min 3 characters" }),
});
