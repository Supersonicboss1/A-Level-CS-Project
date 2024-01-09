import { z } from "zod";
export const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
});
export type FormSchema = typeof formSchema;