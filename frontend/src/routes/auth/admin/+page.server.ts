import api from "$lib/api";
import { fail, redirect, type RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { loginFormSchema, registerFormSchema } from "./schema";

export const load: PageServerLoad = async ({cookies}) => {
    if (cookies.get("isAdmin") === "true") {
        redirect(303, "/admin/home");
    }
    else if (cookies.get("isAdmin") === "false") {
        redirect(303, "/user/home");
    }
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

        event.cookies.set("id", String(user.id), {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        event.cookies.set("token", user.token, {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        event.cookies.set("isAdmin", "true", {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        if (typeof (user) === "object") {
            redirect(303, "/admin/home");
        }
        else {
            return fail(400, {
                loginForm
            });
        }
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
        event.cookies.set("id", String(user.id), {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        event.cookies.set("token", user.token, {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        event.cookies.set("isAdmin", "true", {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        if (typeof (user) === "object") {
            redirect(303, "/admin/home");
        }
        else {
            return fail(400, {
                registerForm
            });
        }

    }
};