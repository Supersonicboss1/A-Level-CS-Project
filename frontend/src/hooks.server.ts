import { OpenAPI } from '$lib/api';
import type { Handle } from '@sveltejs/kit';
const urlAPI = import.meta.env.VITE_isWeb
	? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev`
	: 'http://127.0.0.1:8000';
export const handle = (async ({ event, resolve }) => {
	OpenAPI.BASE = urlAPI;
	const response = await resolve(event);
	return response;
}) satisfies Handle;
