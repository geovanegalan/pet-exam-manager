function formErrors() {
	const errors = [];

	document.querySelectorAll("input").forEach((e) => {
		const label =
			document.querySelector(`label[for="${e.id}"]`)?.textContent || e.id;
		if (!e.checkValidity()) {
			if (e.validity.valueMissing) {
				errors.push(`${label} campo obrigatório`);
			} else if (e.validity.patternMismatch) {
				errors.push(`${label} formato inválido`);
			} else if (e.validity.typeMismatch) {
				errors.push(`${label} valor inválido`);
			}
		}
	});

	return errors;
}
