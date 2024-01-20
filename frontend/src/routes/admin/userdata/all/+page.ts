import api from '$lib/api';
import type { PageLoad } from './$types';


export const load: PageLoad = () => {
    return {
        props: {
            users: api.userdata.getAllUsers(1000000000, "token") // this won't work cause it's not a valid ID
        }
    };
};
