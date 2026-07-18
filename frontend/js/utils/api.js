const BASE_URL = "http://localhost:3000";

async function apiPost(endpoint, data) {
	return axios.post(`${BASE_URL}${endpoint}`, data, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
}

async function apiGet(endpoint) {
	return axios.get(`${BASE_URL}${endpoint}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
}
