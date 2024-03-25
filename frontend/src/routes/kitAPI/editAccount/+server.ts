import api from "$lib/api";
import type { User } from "$lib/types";
import type { RequestEvent } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
	const cookie = {
		id: Number(event.cookies.get("id") ?? "-1"),
		token: event.cookies.get("token") ?? "",
		isAdmin: JSON.parse(event.cookies.get("isAdmin") ?? "false"),
	};

	let req: {
		userInfo: User;
	};
	let body: User;
	try {
		// Put this in a try block in case something goes wrong with the request.
		req = await event.request.json();
		body = req.userInfo;
	} catch (error) {
		return new Response("Bad Request", { status: 400 });
	}

	// If the user is not an admin, they can only edit their own account.
	console.log(cookie.isAdmin, body, cookie.id);
	if (cookie.isAdmin === false && body.id !== cookie.id)
		return new Response("Forbidden", { status: 403 });

	const editUserRequest = await api.userdata.editUser(
		body,
		cookie.id,
		cookie.token,
	);
	// If the request fails, return a 400 status code.
	if (!editUserRequest) return new Response("", { status: 400 });

	return new Response("", { status: 200 });
};
