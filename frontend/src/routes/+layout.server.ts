export const prerender = false;
const urlAPI = import.meta.env.VITE_isWeb
	? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev`
	: 'http://127.0.0.1:8000';
OpenAPI.BASE = urlAPI;
import { OpenAPI } from '$lib/api';
