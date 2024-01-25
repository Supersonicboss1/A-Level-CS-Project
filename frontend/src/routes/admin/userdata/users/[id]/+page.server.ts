import api from '$lib/api';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ cookies, params }) => {
    const cookie = {
        id: Number(cookies.get('id')),
        token: cookies.get('token'),
        isAdmin: Boolean(cookies.get('isAdmin'))
    };
    if (cookie.id && cookie.token && cookie.isAdmin && cookie != null) {
        const response = await api.userdata.getUserData(Number(params.id), cookie.token, cookie.id);
        if (response instanceof Object) {
            return {
                user: response
            };
        }

    }
}