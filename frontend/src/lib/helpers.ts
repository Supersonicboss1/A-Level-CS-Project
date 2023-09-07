export const API_URL = import.meta.env.VITE_isWeb
    ? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev`
    : 'http://127.0.0.1:8000';

/**
 *
 * @param path the path to the API endpoint, relative to the API_URL, i.e. /auth/login
 * @returns the full URL to the API endpoint
 */
export function formAPIString(path: string): string {
    if (path.startsWith('/')) {
        path = path.slice(1);
    }
    return `${API_URL}/${path}`;
}