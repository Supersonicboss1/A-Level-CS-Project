import api from "$lib/api";
import { faker } from "@faker-js/faker";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ cookies }) => {
	const cookie = {
		id: Number(cookies.get("id")),
		token: cookies.get("token"),
		isAdmin: Boolean(cookies.get("isAdmin")),
	};
	console.table(cookie);
	if (cookie.id && cookie.token && cookie.isAdmin) {
		const response = await api.userdata.getAdminData(cookie.token, cookie.id);
		if (response instanceof Object) {
			return {
				user: response,
				status: 200,
			};
		}

		return redirect(303, "/");
	}

	return {
		users: [],
		error: "You are not authorized to view this page",
		status: 403,
	};
};

export const actions = {
	default: async () => {
		// create 10 random users
		for (let i = 0; i < 10; i++) {
			const user = {
				email: faker.internet.email(),
				password: faker.internet.password(),
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				dob: faker.date.birthdate().toUTCString(),
			};
			await api.auth.registerUser(user);
		}
		return {
			status: 200,
		};
	},
} satisfies Actions;
