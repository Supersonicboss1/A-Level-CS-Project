const isWeb = false
export const urlAPI = isWeb ? `https://${import.meta.env.VITE_CSNAME}-8000.preview.app.github.dev/api/` : 'http://localhost:8000/api/';
export async function fetchBackend(route: string, data?: RequestInit) {
		const x = urlAPI + route;
		// check if any double slashes after https://
		const y = x.replace(/([^:]\/)\/+/g, '$1');
		return fetch(y, data);
	}
export async function fetchData(urlValue='/') {
		const response = await fetchBackend(urlValue);

		const data = await response.json();
		console.log(data);
		return data;
	}