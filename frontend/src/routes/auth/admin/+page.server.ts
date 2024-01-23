import api from "$lib/api";
import { fail, type RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { loginFormSchema, registerFormSchema } from "./schema";
import { userStore } from "$lib/stores";
export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(registerFormSchema),
        loginForm: await superValidate(loginFormSchema)
    };
};
export const actions: Actions = {
    login: async (event: RequestEvent) => {
        const loginForm = await superValidate(event, loginFormSchema);
        if (!loginForm.valid) {
            return fail(400, {
                loginForm
            });
        }
        const user = await api.auth.loginAdmin(loginForm.data.email, loginForm.data.password);
        userStore.set(user);
        return {
            loginForm
        };
    },
    register: async (event: RequestEvent) => {
        const registerForm = await superValidate(event, registerFormSchema);
        console.log(registerForm);
        if (!registerForm.valid) {
            return fail(400, {
                registerForm
            });
        }
        const user = await api.auth.registerAdmin(registerForm.data.email, registerForm.data.password, registerForm.data.adminKey, registerForm.data.firstName, registerForm.data.lastName);
        userStore.set(user);
        return {
            registerForm
        };

    }
};