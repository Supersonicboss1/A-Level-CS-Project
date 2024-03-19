import api from "$lib/api";
import type { RequestEvent } from "./$types";

export const POST = async (event: RequestEvent) => {
	const cookie = {
		id: Number(event.cookies.get("id") ?? "-1"),
		token: event.cookies.get("token") ?? "",
		isAdmin: JSON.parse(event.cookies.get("isAdmin") ?? "false"),
	};
	if (cookie.isAdmin) {
		// Admins cannot like films, there is no column in the database.
		return new Response("Admins cannot like films", { status: 500 });
	}
	let body: { id: number };
	try {
		// Put this in a try block in case something goes wrong with the request.
		body = await event.request.json();
	} catch (error) {
		console.log("Error parsing JSON, returning 400");
		return new Response("Bad Request", { status: 400 });
	}

	const removeLikedMovieRequest = await api.userdata.removeFromLikedMovies(
		cookie.id,
		body.id,
		cookie.token,
	);
	if (!removeLikedMovieRequest) {
		// If the request fails, return a 400 status code.
		console.log("Failed to reset liked movies, returning 400");
		return new Response("", { status: 400 });
	}
	console.log("Successfully reset liked movies, returning 200");
	return new Response("", { status: 200 });
};
