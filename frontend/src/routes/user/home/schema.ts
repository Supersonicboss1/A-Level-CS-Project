import { z } from "zod";
export const recommendFormSchema = z.object({
	genre: z.string().optional(),
	ageRating: z.enum(["Any", "U", "PG", "12A", "12", "15", "18"]),
	runtime: z.string().optional().refine((x) => {
		if (x == null) {
			return true;
		}
		const num = Number(x);
		return !Number.isNaN(num) && num > 0;
		}, "Runtime must be a positive number")
});

export type RecommendFormSchema = typeof recommendFormSchema;
