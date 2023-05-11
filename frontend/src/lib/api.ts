export const urlAPI = import.meta.env.VITE_isWeb ? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev` : 'http://localhost:8000';
import createClient from "openapi-fetch";
import type { paths } from "./types/api";
const { get, post } = createClient<paths>({ baseUrl: urlAPI });
console.log(urlAPI);
console.log(typeof import.meta.env.VITE_isWeb);
export const API = {
    get,
    post
};
