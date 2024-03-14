import { z } from "zod";
export const recommendFormSchema = z.object({
	genre: z.string().optional(),
	ageRating: z.enum(["Any", "U", "PG", "12A", "12", "15", "18"]),
	runtime: z.string().optional(),
});

export type RecommendFormSchema = typeof recommendFormSchema;
