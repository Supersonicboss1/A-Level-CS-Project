import { DefaultService, type UserInfoResponse } from "$lib/api"

/** @type {import('./$types').PageLoad} */
export async function load(): Promise<UserInfoResponse> {
    const userData = await DefaultService.getUserInfoApiAuthInfoGet('test');
    return userData
    }