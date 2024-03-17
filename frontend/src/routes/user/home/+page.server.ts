import api from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { recommendFormSchema } from "./schema";
export const load: PageServerLoad = async () => {
		return {
			formSchema: await superValidate(recommendFormSchema)};
	}

export const actions: Actions = {
	default: async (event) => {
		const cookie = {
			id: Number(event.cookies.get("id")),
			token: event.cookies.get("token"),
		};
		if (!cookie.id || !cookie.token) {
			return fail(401, {
				message: "You must be logged in to access this page",
			});
		}
		const recommendForm = await superValidate(event, recommendFormSchema);
		if (!recommendForm.valid) {
			return fail(400, {
				recommendForm,
			});
		}
		const recommendations = await api.recommendations.getRecommendations(
			cookie.id,
			cookie.token,
			recommendForm.data.genre ? recommendForm.data.genre : "",
			recommendForm.data.ageRating,
			recommendForm.data.runtime ? Number(recommendForm.data.runtime) : 0,
		);
		console.log(recommendations);
		return {
			form: recommendForm,
			success: true,
			data: recommendations,
		};
	},
};
