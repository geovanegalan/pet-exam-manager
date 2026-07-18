const form = document.getElementById("form-owner");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		if (!form.checkValidity()) {
			const errors = formErrors();
			Swal.fire({
				icon: "error",
				title: "Verifique os campos!",
				html: errors.map((e) => `❌ ${e}</p>`).join(""),
				footer: '<a href="#">Contact Support</a>',
			});
			return;
		}

		const owner = {
			name: document.getElementById("name").value,
			cpf: document.getElementById("cpf").value,
			tel: document.getElementById("tel").value,
			email: document.getElementById("email").value,
			address: `${document.getElementById("rua").value}, ${document.getElementById("numero").value} - ${document.getElementById("bairro").value}`,
		};

		const newOwner = {
			...owner,
			cpf: sanitizeCPF(owner.cpf),
			tel: sanitizeTel(owner.tel),
		};

		await apiPost("/owners", newOwner);

		Swal.fire({
			icon: "success",
			title: "Dono cadastrado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		Swal.fire("Erro ao cadastrar dono!");
	}
});

//Função para identificar erros do formulário

//Mask
IMask(document.getElementById("cpf"), {
	mask: "000.000.000-00",
});

IMask(document.getElementById("tel"), {
	mask: "(00) 00000-0000",
});

IMask(document.getElementById("cep"), {
	mask: "00000-000",
});
