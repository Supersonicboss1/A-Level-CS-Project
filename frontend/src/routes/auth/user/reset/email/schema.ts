import { z } from "zod";

export const resetEmailFormSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
});
export type ResetEmailFormSchema = typeof resetEmailFormSchema;
