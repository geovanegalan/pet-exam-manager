const VIACEP_URL = "https://viacep.com.br/ws/";

async function findCEP(cep) {
	try {
		const response = await axios.get(`${VIACEP_URL}${cep}/json/`);

		if (response.data.erro) {
			throw new Error("CEP não encontrado!");
		}

		const data = response.data;

		document.getElementById("rua").value = data.logradouro;
		document.getElementById("bairro").value = data.bairro;
		document.getElementById("cidade").value = data.localidade;
	} catch (error) {
		console.error(error);
	}
}
