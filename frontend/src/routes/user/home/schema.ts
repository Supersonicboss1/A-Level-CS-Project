import { z } from "zod";
import { genres } from "./data";
export const recommendFormSchema = z.object({
    genre: z.string().refine((genre) => {
        return genres.includes(genre);
    }),
    ageRating: z.enum(["U", "PG", "12A", "12", "15", "18"]),
    runtime: z.string().refine((runtime) => {
        const [min, max] = runtime.split("-").map((time) => parseInt(time));
        return min <= max;
    })
});

export type RecommendFormSchema = typeof recommendFormSchema;