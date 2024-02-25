import { genres } from "$lib/data/movies";
import { z } from "zod";
export const recommendFormSchema = z.object({
    genre: z.string().refine((genre) => {
        return genres.includes(genre);
    }),
    ageRating: z.enum(["Any","U", "PG", "12A", "12", "15", "18"]),
    runtime: z.string().refine((runtime) => {
        // in form min-max
        const [min, max] = runtime.split("-");
        return !isNaN(Number(min)) && !isNaN(Number(max)) && Number(min) < Number(max);
    })
});

export type RecommendFormSchema = typeof recommendFormSchema;