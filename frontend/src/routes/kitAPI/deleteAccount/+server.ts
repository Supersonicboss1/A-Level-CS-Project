import api from "$lib/api";
import type { RequestEvent } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
	const cookie = {
		id: event.cookies.get("id") ?? "-1",
		token: event.cookies.get("token") ?? "",
		isAdmin: event.cookies.get("isAdmin") ?? false,
	};
	if (cookie.isAdmin === true) {
		console.log("Cannot like films as an admin!");
		return new Response("", { status: 401 })}
	let body: { id: number };
	try {
		body = await event.request.json();
	} catch (error) {
		console.log(error);
		return new Response("", { status: 400 });
	}
	console.log(cookie);
	console.log(body);
	const req = await api.userdata.deleteUser(
		body.id,
		Number(cookie.id),
		cookie.token,
	);
	if (!req) return new Response("", { status: 400 });
	return new Response("", { status: 200 });
};
