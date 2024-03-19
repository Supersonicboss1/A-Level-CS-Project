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
		return new Response("Admins cannot like films", { status: 403 });
	}
	let body: { id: number };
	try {
		// Put this in a try block in case something goes wrong with the request.
		body = await event.request.json();
	} catch (error) {
		console.log("Error parsing JSON, returning 400");
		return new Response("Bad Request", { status: 400 });
	}
	console.log(cookie);
	console.log(body);
	const addLikedMovieRequest = await api.userdata.addToLikedMovies(
		cookie.id,
		body.id,
		cookie.token,
	);
	// If the request fails, return a 400 status code.
	if (!addLikedMovieRequest) {
		console.log("Failed to add to liked movies, returning 400");
		return new Response("Internal Server Error", { status: 400 });
	}
	console.log("Successfully added to liked movies, returning 200");
	return new Response("", { status: 200 });
};
