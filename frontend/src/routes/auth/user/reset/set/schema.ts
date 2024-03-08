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

export const resetFormSchema = z.object({
    token: z.string().length(36, { message: "Invalid token" }),
    newPassword: passwordSchema,
});
export type ResetFormSchema = typeof resetFormSchema;
