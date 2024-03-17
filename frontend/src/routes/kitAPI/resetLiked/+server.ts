import api from "$lib/api";
import type { RequestEvent } from "./$types";

export const POST = async (event: RequestEvent) => {
	const cookie = {
		id: event.cookies.get("id") ?? "-1",
		token: event.cookies.get("token") ?? "",
		isAdmin: JSON.parse(event.cookies.get("isAdmin") ?? "false"),
	};
	let body: { id: number };
	try {
		body = await event.request.json();
	} catch (error) {
		console.log("Error parsing JSON, returning 400");
		return new Response("", { status: 400 });
	}
	console.log(cookie);
	console.log(body);
	const req = await api.userdata.resetLikedMovies(
		Number(cookie.id),
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
