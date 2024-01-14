import { z } from "zod";
const passwordSchema = z.string()
    .min(8, { message: " Password must be at least 8 characters long" })
    .refine((password) => {
        const hasNumber = /\d/.test(password);
        return hasNumber;
    }, { message: " Password must contain a number" })
    .refine((password) => {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasSpecialChar;
    }, { message: " Password must contain a special character" })
    .refine((password) => {
        const hasUppercase = /[A-Z]/.test(password);
        return hasUppercase;
    }, { message: " Password must contain an uppercase letter" })
export const registerFormSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordSchema,
    dob: z.string().refine((date) => {
        const dob = new Date(date);
        const now = new Date();
        const age = now.getFullYear() - dob.getFullYear();
        return age >= 18;
    }, { message: "You must be at least 18 years old" })
});
export const signInFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordSchema
});
export type RegisterFormSchema = typeof registerFormSchema;
export type SignInFormSchema = typeof signInFormSchema;