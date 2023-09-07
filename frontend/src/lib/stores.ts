import { writable, type Writable } from 'svelte/store';

export const user: Writable<{
	username: string;
	password: string;
}> = writable({
	username: '',
	password: ''
});