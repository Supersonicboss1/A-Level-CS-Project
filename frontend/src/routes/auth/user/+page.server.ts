import api from "$lib/api";
import { fail, redirect } from "@sveltejs/kit";
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
    login: async (event) => {
        const loginForm = await superValidate(event, loginFormSchema);
        if (!loginForm.valid) {
            return fail(400, {
                loginForm
            });
        }
        const user = await api.auth.loginUser(loginForm.data.email, loginForm.data.password);
        console.log(user);
        event.cookies.set("id", user.id.toString(), {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"
        });
        event.cookies.set("token", user.token, {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        event.cookies.set("isAdmin", "false", {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        redirect(303, "/user/home");
    },
    register: async (event) => {
        const registerForm = await superValidate(event, registerFormSchema);
        console.log(registerForm);
        if (!registerForm.valid) {
            return fail(400, {
                registerForm
            });
        }
        const user = await api.auth.registerUser(registerForm.data.email, registerForm.data.password, registerForm.data.firstName, registerForm.data.lastName, registerForm.data.dob);
        console.log(user);
        event.cookies.set("id", user.id.toString(), {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"
        });
        event.cookies.set("token", user.token, {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        event.cookies.set("isAdmin", "false", {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            path: "/"

        });
        redirect(303, "/user/home");

    }
};