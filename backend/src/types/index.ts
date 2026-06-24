//Dono
export interface Owners {
  id: string;
  name: string;
  cpf: string;
  telefone: string;
  email: string;
  endereço: string;
  dataCadastro: string;
}

//Animal
export interface Pet {
  id: string;
  name: string;
  specie: string;
  breed: string;
  age: number;
  weigth: number;
  sex: 'M' | 'F';
  ownerId: string;
}

//Agendamento
export interface Appointment {
  id: string;
  idPet: string;
  idOwner: string;
  date: string;
  examType: string;
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
  observation: string;
  creatAt: string;
}

//Exame
export interface Exam {
  id: string;
  idAppointment: string;
  idPet: string;
  idMedVet: string;
  dateStart: string;
  dateEnd: string;
  result: string;
  observation: string;
  status: 'concluido' | 'em andamento';
}

// Estoque
export interface Stock {
  id: string;
  nomeMaterial: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
  unidade: string;
}

// Movimentação de Estoque
export interface StockMovement {
  id: string;
  idMaterial: string;
  idExame: string;
  tipo: 'entrada' | 'saída';
  quantidade: number;
  motivo: string;
  data: string;
}
