import type { RequestEvent } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
	event.cookies.delete("id", { path: "/" });
	event.cookies.delete("token", { path: "/" });
	event.cookies.delete("isAdmin", { path: "/" });
	console.log("Logged out, returning 303");
	return new Response("", { status: 303 })
};
