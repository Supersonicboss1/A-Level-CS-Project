import { writable } from 'svelte/store';
//@ts-expect-error TS doesn't understand that nullability is handled by the ternary operator
export const user = writable(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
//@ts-expect-error TS doesn't understand that nullability is handled by the ternary operator
export const token = writable(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

// save to local storage
user.subscribe((value) => {
    if (value) {
        localStorage.setItem('user', JSON.stringify(value));
    } else {
        localStorage.removeItem('user');
    }
}
);

token.subscribe((value) => {
    if (value) {
        localStorage.setItem('token', JSON.stringify(value));
    } else {
        localStorage.removeItem('token');
    }
}
);