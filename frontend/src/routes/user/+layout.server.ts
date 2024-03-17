import api from "$lib/api";
import { fail } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const cookie = {
        id: Number(cookies.get("id")),
        token: cookies.get("token"),
        isAdmin: JSON.parse(cookies.get("isAdmin") ?? "false"),
    };
    if (cookie.id !== -1 && cookie.token && !cookie.isAdmin) {
        const userData = await api.userdata.getUserData(cookie.id, cookie.token);
        const likedMovies = await api.userdata.getLikedMovies(cookie.id, cookie.token);
        return {userData: userData,
            likedMovies: likedMovies,
        };
    }
    if (cookie.isAdmin) {
        		return fail(403, {
											error: "Admin users cannot use the recommendations system",
										});
    }
    return fail(403, {
        error: "You are not authorized to view this page",
    });
}