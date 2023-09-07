import { formAPIString } from './helpers'
export class API {
    static async login(email: string, password: string): Promise<boolean> {
        const response = await fetch(formAPIString('/api/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        return response.json()
    }
    static async register(email: string, password: string, name: string, dob: string): Promise<boolean> {
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]
        const response = await fetch(formAPIString('/register'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, firstName, lastName, dob })
        })
        return response.json()
    }
    static async getProfile(email: string): Promise<{
        email: string,
        user_id: string,
        logged_in: boolean,
    }> {
        const response = await fetch(formAPIString('/api/auth/info?email=' + email), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        return response.json()
    }
}