import api from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const movieData = await api.movies.getMovies();
    if (Array.isArray(movieData)) {
        return {

                movies: movieData,
                status: 200
        }
    }
    return {
        error: "Failed to get movies",
        status: 500
    }
}