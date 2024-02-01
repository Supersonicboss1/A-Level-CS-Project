import api from '$lib/api';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ cookies }) => {
    const cookie = {
        id: Number(cookies.get('id')),
        token: cookies.get('token'),
        isAdmin: Boolean(cookies.get('isAdmin'))
    };
    console.table(cookie);
    if (cookie.id && cookie.token && cookie.isAdmin) {
        const response = await api.userdata.getAdminData(cookie.token, cookie.id);
        if (response instanceof Array) {
            return {
                user: response,
                status: 200
            };
        }
        else {
            return fail(403, {
                error: "You are not authorized to view this page"
            
            })
        }

    }
    else {
        return {
            users: [],
            error: "You are not authorized to view this page",
            status: 403
        };
    }
}