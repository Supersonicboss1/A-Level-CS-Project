import api from "$lib/api";
import type { RequestEvent } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
	const cookie = {
		id: Number(event.cookies.get("id") ?? "-1"),
		token: event.cookies.get("token") ?? "",
		isAdmin: JSON.parse(event.cookies.get("isAdmin") ?? "false"),
	};
	let body: { id: number };
	try {
		// Put this in a try block in case something goes wrong with the request.
		body = await event.request.json();
	} catch (error) {
		return new Response("Bad Request", { status: 400 });
	}
	if (cookie.isAdmin === false && cookie.id !== body.id) {
		// If the user is not an admin, they can only delete their own account.
		return new Response("Forbidden", { status: 403 });
	}

	const deleteUserRequest = await api.userdata.deleteUser(
		body.id,
		cookie.id,
		cookie.token,
	);
	// If the request fails, return a 400 status code.
	if (!deleteUserRequest) return new Response("", { status: 400 });
	// clear the cookies
	event.cookies.delete("id", { path: "/" });
	event.cookies.delete("token", { path: "/" });
	event.cookies.delete("isAdmin", { path: "/" });

	return new Response("", { status: 200 });
};
