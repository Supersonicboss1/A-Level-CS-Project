import api from "$lib/api";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions } from "./$types";
import { resetEmailFormSchema } from "./schema";

export const actions: Actions = {
    default: async (event) => {
        const registerForm = await superValidate(event, resetEmailFormSchema);
        console.log(registerForm);
        if (!registerForm.valid) {
            return fail(400, {
                registerForm
            });
        }
        await api.auth.sendResetEmail(registerForm.data.email);
        redirect(303, "/user/reset/set");

    }
};