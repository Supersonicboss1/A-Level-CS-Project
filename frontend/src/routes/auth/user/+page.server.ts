import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import { registerFormSchema, signInFormSchema } from "./schema";
export const load: PageServerLoad = async () => {
    return {
        registerForm: await superValidate(registerFormSchema),
        signInForm: await superValidate(signInFormSchema)
    };
};

export const actions: Actions = {
    signIn: async (event) => {
        const signInForm = await superValidate(event, signInFormSchema);
        if (!signInForm.valid) {
            return fail(400, {
                signInForm
            });
        }
        return {
            signInForm
        };
    },
    register: async (event) => {
        const registerForm = await superValidate(event, registerFormSchema);
        if (!registerForm.valid) {
            return fail(400, {
                registerForm
            });
        }
        return {
            registerForm
        };
    }
};