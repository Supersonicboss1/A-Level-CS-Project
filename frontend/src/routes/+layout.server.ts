export const prerender = false;
const urlAPI = import.meta.env.VITE_isWeb ? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev` : 'http://127.0.0.1:8000';
OpenAPI.BASE = urlAPI
import { OpenAPI } from "$lib/api";
import { user } from "$lib/stores";
import { DefaultService } from "$lib/api";
let u: {
    username: string,
    password: string,
}
user.subscribe((value) => {
    u = value
    console.log(u.username + 'user')
})
export async function load() {
    const username = u.username ? u.username : 'test'
    const UserInfo = await DefaultService.getUserInfoApiAuthInfoGet(username);
    console.log(UserInfo)
    return UserInfo
}