export const prerender = false;
export const ssr = false
import { API } from "$lib/api";
export async function load() {
    
    const UserInfo = await API.get('/api/auth/info', {params: {query: {username: 'test'}}})
    console.log(UserInfo.data)
    return UserInfo.data
}