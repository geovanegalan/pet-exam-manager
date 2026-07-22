(async () => {
	const tbody = document.querySelector("tbody");
	const response = await apiGet("/owners");
	const owners = response.data;

	const rows = owners
		.map(
			(owner) => `
        <tr class="hover:bg-[#F7F9FF] transition">
							<td class="px-6 py-4 font-medium text-dark">${owner.name}</td>

							<td class="px-6 py-4 text-gray-600">${owner.tel}</td>

							<td class="px-6 py-4 text-gray-600">${owner.email}</td>

							<td class="px-6 py-4 text-center">
							<button
									class="bg-accent hover:bg-light hover:text-dark transition px-4 py-2 rounded-lg text-white font-medium" data-id="${owner.id}">
							Ver mais
					</button>
				</td>
		</tr>`,
		)
		.join("");

	tbody.innerHTML = rows;
})();

const table = document.querySelector("table");
const ownerName = document.getElementById("owner-name");
const ownerCPf = document.getElementById("owner-cpf");
const ownerTel = document.getElementById("owner-phone");
const ownerEmail = document.getElementById("owner-email");
const ownerAddress = document.getElementById("owner-address");
const ownerCreated = document.getElementById("owner-created");
const modal = document.getElementById("owner-modal");

table.addEventListener("click", async (e) => {
	if (!e.target.matches("button")) return;
	const ownerID = e.target.dataset.id;

	try {
		const response = await apiGet(`/owners/${ownerID}`);
		const ownerData = response.data;

		ownerName.textContent = ownerData.name;
		ownerCPf.textContent = ownerData.cpf;
		ownerTel.textContent = ownerData.tel;
		ownerEmail.textContent = ownerData.email;
		ownerAddress.textContent = ownerData.address;
		const date = new Date(ownerData.createdAt);
		ownerCreated.textContent = date.toLocaleDateString("pt-BR");

		modal.classList.remove("hidden");
	} catch (error) {
		console.error(error);
		Swal.fire({
			icon: "error",
			title: "Erro ao carregar dados do Proprietário!",
			text: "Por favor tente novamente!",
			footer: '<a href="#">Contact Support</a>',
		});
	}
});

function closeModal() {
	modal.classList.add("hidden");
}

document.getElementById("close-modal").addEventListener("click", closeModal);
