import api from "$lib/api";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions } from "./$types";
import { resetFormSchema } from "./schema";

export const actions: Actions = {
    default: async (event) => {
        const registerForm = await superValidate(event, resetFormSchema);
        console.log(registerForm);
        if (!registerForm.valid) {
            return fail(400, {
                registerForm
            });
        }
        await api.auth.resetPassword(registerForm.data.token, registerForm.data.newPassword);
        redirect(303, "/auth/user");

    }
};