import api from "$lib/api";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const movies = await api.movies.getMovies();
		return {
			movies: movies
	}
}
