import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "E-mail is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "E-mail is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
});

export const AddUserSchema = z.object({
  email: z.string().email({
    message: "E-mail is required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
});

export const EditUserSchema = z.object({
  email: z.string().email({
    message: "E-mail is required!",
  }),
  status: z.string(),
  name: z.string().min(1, {
    message: "Name is required!",
  }),
});
