import api from "$lib/api";
import type { User } from "$lib/types";
import type { RequestEvent } from "@sveltejs/kit";


export const POST = async (event: RequestEvent) => {
    const cookie = {
        id: event.cookies.get("id") ?? "-1",
        token: event.cookies.get("token") ?? "",
        isAdmin: event.cookies.get("isAdmin") ?? false
    }
    if (!cookie.isAdmin) return new Response("", { status: 401 })
    let body: User;
    try {
        body = await event.request.json();
    } catch (error) {
        return new Response("", { status: 400 })
    }
    console.log(cookie)
    console.log(body)
    const req = await api.userdata.editUser(body, Number(cookie.id), cookie.token)
    if (!req) return new Response("", { status: 400 })
    return new Response("", { status: 200 })
};