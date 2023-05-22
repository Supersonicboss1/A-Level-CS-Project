export const prerender = false;
export const ssr = false
import { API } from "$lib/api";
import { user } from "$lib/stores";
let u: {
    username: string,
    password: string,
}
user.subscribe((value) => {
    u = value
    console.log(u.username + 'user')
})
export async function load() {
    
    const UserInfo = await API.get('/api/auth/info', {params: {query: {username: u.username}}})
    console.log(UserInfo.data)
    return UserInfo.data
}