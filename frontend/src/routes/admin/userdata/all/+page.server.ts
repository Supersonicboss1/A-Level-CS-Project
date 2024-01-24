import api from '$lib/api';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ cookies }) => {
    const cookie = {
        id: Number(cookies.get('id')),
        token: cookies.get('token'),
        isAdmin: cookies.get('isAdmin')
    };
    if (cookie.id && cookie.token && cookie.isAdmin) {
        const response = await api.userdata.getAllUsers(cookie.id, cookie.token);
        if (response instanceof Array) {
            return {
                users: response
            };
        }

    }
}