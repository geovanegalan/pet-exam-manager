const form = document.getElementById("form-login");
const BASE_URL = "http://localhost:3000";

form.addEventListener("submit", async (e) => {
	try {
		e.preventDefault();
		if (!form.checkValidity()) {
			Swal.fire("Preencha os campos corretamente!");
		}

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		const response = await axios.post(`${BASE_URL}/auth/login`, {
			email,
			password,
		});

		const token = response.data.token;

		localStorage.setItem("token", token);

		window.location.href = "../pages/logado.html";
	} catch (error) {
		Swal.fire("Email ou senha incorretos!");
		console.error(error);
	}
});
