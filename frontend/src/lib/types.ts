 interface BaseUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface User extends BaseUser {
    dob: string;
    isAdmin: false;
}

export interface Admin extends BaseUser {
    isAdmin: true;
}