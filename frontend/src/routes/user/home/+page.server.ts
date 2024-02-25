import api from '$lib/api';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { recommendFormSchema } from './schema';
export const load: PageServerLoad = async ({ cookies }) => {
    const cookie = {
        id: Number(cookies.get('id')),
        token: cookies.get('token')
    };
    if (cookie.id && cookie.token) {
        const response = await api.userdata.getUserData(cookie.id, cookie.token);
        return response;
    }
};
export const actions: Actions = {
    default: async (event) => {
        const recommendForm = await superValidate(event, recommendFormSchema);
        if (!recommendForm.valid) {
            return fail(400, {
                recommendForm
            });
        }
        return {
            form: recommendForm,
            success: true,
            data: [ // example data
                {
                    id: 9,
                    title: "Wonka",
                    posterURL: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xAKI0O5hUXxbmHRBNg72IzFQ06a.jpg",
                    year: 2023,
                    rating: 7.4,
                    description: "Armed with nothing but a hatful of dreams, young chocolatier Willy Wonka manages to change the world, one delectable bite at a time.",
                    genres: ["Comedy", "Family", "Fantasy"],
                    actors: ["Timothée Chalamet", "Keegan-Michael Key", "Olivia Colman", "Rowan Atkinson", "Simon Farnaby", "Richard Ayoade", "Sally Hawkins", "Rami Malek"]
                },
                {
                    id: 10,
                    title: "Cannahuana: The Moweed",
                    posterURL: "https://images.justwatch.com/poster/12099128/s276/cannahuana-the-moweed.webp",
                    year: 2020,
                    rating: 7.4,
                    description: "A documentary about Cannahuana, the moweed.",
                    genres: ["Documentary"],
                    actors: []
                },
                {
                    id: 11,
                    title: "Rocky",
                    posterURL: "https://upload.wikimedia.org/wikipedia/en/1/18/Rocky_poster.jpg",
                    year: 1976,
                    rating: 8.1,
                    description: "Rocky Balboa, a small-time boxer, gets a supremely rare chance to fight heavy-weight champion Apollo Creed in a bout in which he strives to go the distance for his self-respect.",
                    genres: ["Drama", "Sport"],
                    actors: ["Sylvester Stallone", "Talia Shire", "Burt Young", "Carl Weathers", "Burgess Meredith", "Thayer David", "Joe Spinell", "Jimmy Gambina"]
                }
            ]
        }
    }
};