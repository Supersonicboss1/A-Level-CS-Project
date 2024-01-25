import type { Admin, User } from "./stores";

class API { // The entire API kind of just assumes there are no errors ever
    private API_URL = "http://localhost:8000/api";
    async get(url: string): Promise<Response> {
        console.log(this.API_URL + url);
        if (url[0] !== "/") {
            url = `/${url}`;
        }
        const response = await fetch(`${this.API_URL}${url}`);
        return response;
    }
    public async post(url: string, body: object): Promise<Response> {
        console.log(this.API_URL + url);
        if (url[0] !== "/") {
            url = `/${url}`;
        }
        const response = await fetch(`${this.API_URL}${url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    }
}

class Auth extends API {
    async registerUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dob: string
    ): Promise<User> {
        const response = this.post("/auth/user/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
        });
        return (await response).json().then((data) => {
            console.log(data);
            return data.map((user: User) => {
                user.isAdmin = false;
                return user;
            });
        })
    }
    async registerAdmin(email: string, password: string, adminKey: string, firstName: string, lastName: string): Promise<Admin> {
        const response = this.post("/auth/admin/register", {
            email: email,
            password: password,
            admin_key: adminKey,
            firstName: firstName,
            lastName: lastName
        });
        return (await response).json().then((data) => {
            console.log(data);
            return data.map((admin: Admin) => {
                admin.isAdmin = true;
                return admin;
            });
        })
    }
    async loginUser(email: string, password: string): Promise<User> {
        const response = this.post("/auth/user/login", {
            email: email,
            password: password,
        });
        return (await response).json().then((data) => {
            console.log(data);
            return data.map((user: User) => {
                user.isAdmin = false;
                return user;
            })
        })
    }
    async loginAdmin(email: string, password: string): Promise<Admin> {
        const response = this.post("/auth/admin/login", {
            email: email,
            password: password,
        });
        return (await response).json().then((data) => {
            console.log(data);
            return data.map((admin: Admin) => {
                admin.isAdmin = true;
                return admin;
            })
        })
    }
}

class UserData extends API {
    async getUserData(userID: number, token: string, requesterID?: number): Promise<User> {
        const requestID: number = requesterID || userID;
        const response = await this.get(`/userdata/users/${userID}?requester_user_id=${requestID}&token=${token}`);
        return response.json().then((data) => {
            console.log(data);
            return data;
        })
    }
    async getAllUsers(requesterID: number, token: string): Promise<User[]> {
        const response = await this.get(
            `/userdata/all?requester_user_id=${requesterID}&token=${token}`
        );
        return (response).json().then((data) => {
            console.log(data);
            return data;
        })
    }
    async deleteUser(userID: number, requesterID: number, token: string): Promise<boolean> {
        const response = this.post(
            `/userdata/delete/${userID}?requester_user_id=${requesterID}&token=${token}`,
            {}
        );
        return (await response).json().then((data) => {
            console.log(data);
            return Boolean(data);
        })
    }
}
const api = {
    auth: new Auth(),
    userdata: new UserData(),
};
export default api;
