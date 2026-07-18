//Função para limpar os campos de cpf, tel e cep
function sanitizeCPF(cpf) {
	cpf: owner.cpf.replace(/\D/g, "");
}
function sanitizeTel(tel) {
	tel: owner.tel.replace(/\D/g, "");
}
