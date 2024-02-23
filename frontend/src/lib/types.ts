interface BaseUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface User extends BaseUser {
    dob: string;
}

export interface Admin extends BaseUser {
}