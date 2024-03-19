import api from "$lib/api";
import type { RequestEvent } from "./$types";

export const POST = async (event: RequestEvent) => {
	const cookie = {
		id: Number(event.cookies.get("id") ?? "-1"),
		token: event.cookies.get("token") ?? "",
		isAdmin: JSON.parse(event.cookies.get("isAdmin") ?? "false"),
	};
	let body: { id: number };
	try {
		body = await event.request.json();
	} catch (error) {
		console.log("Error parsing JSON, returning 400");
		return new Response("Bad Request", { status: 400 });
	}
	if (cookie.isAdmin || cookie.id !== body.id) {
		return new Response("Forbidden", { status: 403 });
	}
	console.log(cookie);
	console.log(body);
	const req = await api.userdata.resetLikedMovies(
		cookie.id,
		cookie.token,
		body.id,
	);
	if (!req) {
		console.log("Failed to add to liked movies, returning 400");
		return new Response("", { status: 400 });
	}
	console.log("Successfully added to liked movies, returning 200");
	return new Response("", { status: 200 });
};
