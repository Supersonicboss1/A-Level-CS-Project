class API {
    API_URL = "http://localhost:8000/api";
    async get(url: string) {
        console.log(this.API_URL + url);
        if (url[0] !== "/") {
            url = `/${url}`;
        }
        const response = await fetch(`${this.API_URL}${url}`);
        return response.json();
    }
    async post(url: string, body: object): Promise<Response> {
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
    async getUserData(userID: number, requesterID: number, token: string) {
        return this.get(
            `/userdata/users/${userID}?requester_user_id=${requesterID}&token=${token}`
        );
    }
    async getAllUsers(requesterID: number, token: string) {
        return this.get(
            `/userdata/all?requester_user_id=${requesterID}&token=${token}`
        );
    }
    async registerUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        dob: string
    ) {
        return this.post("/auth/user/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
        });
    }
    async deleteUser(userID: number, requesterID: number, token: string) {
        return this.post(
            `/userdata/delete/${userID}?requester_user_id=${requesterID}&token=${token}`,
            {}
        );
    }
    async registerAdmin(email: string, password: string, adminKey: string, firstName: string, lastName: string) {
        return this.post("/auth/admin/register", {
            email: email,
            password: password,
            admin_key: adminKey,
            firstName: firstName,
            lastName: lastName
        });
    }
    //login api has not been implemented yet, so no frontend either
}
export default new API();