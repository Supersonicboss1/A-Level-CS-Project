import api from '$lib/api';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ cookies }) => {
    const cookie = {
        id: Number(cookies.get('id')),
        token: cookies.get('token')
    };
    if (cookie.id && cookie.token) {
        const response = await api.userdata.getUserData(cookie.id, cookie.token);
        return response;
    }
};