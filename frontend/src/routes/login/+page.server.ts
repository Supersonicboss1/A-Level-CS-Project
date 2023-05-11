/** @type {import('./$types').PageLoad} */
import { API } from "$lib/api";
export async function load() {
    const userInfo = await API.get('/api/auth/info', { params: { query: { username: 'test' } } });
    console.log(userInfo.data);
    const userData = userInfo.data;
    return {
        status: 200,
        body: {
            userData: userData
        }
    }
}