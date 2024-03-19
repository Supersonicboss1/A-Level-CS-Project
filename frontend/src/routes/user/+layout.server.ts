import api from "$lib/api";
import { redirect } from "@sveltejs/kit";
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
        console.log("User data and liked movies loaded successfully!")
        return {userData: userData,
            likedMovies: likedMovies,
        };
    }
    if (cookie.isAdmin) {
        console.log("Admin users cannot use the recommendations system");
        		return redirect(303, "/admin/home");
    }
    console.log("User is not logged in, returning 403");
    return redirect(303, "/auth/user");
}