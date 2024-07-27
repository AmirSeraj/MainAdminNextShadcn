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

const MAX_FILE_SIZE = 5242880;
function checkFileType(files: FileList) : boolean {
  // file type checking
  if (files.length > 0) {
    const fileType = files[0].name.split(".").pop() ?? "";
    if (["gif", "png", "jpg", "jpeg", "jfif", "webp"].includes(fileType))
      return true;
  }
  return false;
}

const optionSchema = z.object({
  value: z.string(),
  disable: z.boolean().optional(),
});

export const ArticleSchema = z.object({
  title: z.string().min(4, {
    message: "Title is required!",
  }),
  content: z.string().min(10, {
    message: "Content is required!",
  }),
  summary: z.string().min(10, {
    message: "Summary is required!",
  }),
  // min_read: z.number(),
  image: z
    .any()
    .refine((files) => {
      console.log("files", !files || files.length === 0 || files === undefined);
      return !files || files.length === 0 || files === undefined;
    }, "File is required") // If you also wanna validate if the file exists
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 5MB.") // file size validation
    .refine(
      (files) => checkFileType(files),
      "Only .jpg, .gif, .png, .jpeg, .jfif and .webp formats are supported."
    ),
  tags: z.array(optionSchema).min(1),
});
