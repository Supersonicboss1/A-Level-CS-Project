import { writable } from 'svelte/store';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string | undefined;
    token: string;
    isAdmin: boolean;
}

export const userStore = writable<User | null>(null);
