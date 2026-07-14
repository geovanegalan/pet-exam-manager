//Dono
export interface Owner {
  id: string;
  name: string;
  cpf: string;
  tel: string;
  email: string;
  address: string;
  createdAt: string;
}

//Animal
export interface Pet {
  id: string;
  name: string;
  specie: string;
  breed: string;
  age: number;
  weight: number;
  sex: 'M' | 'F';
  ownerId: string;
  history?: string[];
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
  protocol: string;
  cancelReason?: string;
  createdAt: string;
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
  status: 'concluído' | 'em andamento';
}

export interface History {
  id: string;
  idDono: string;
  idPet: string;
  idAppointment: string;
  status: string;
  examStatus?: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
  createdAt: string;
  petHistory?: string;
  protocol?: string;
  cancelReason?: string;
  accomplishedAt?: string;
}

// Estoque
export interface Stock {
  id: string;
  materialName: string;
  currentAmount: number;
  minAmount: number;
  unit: string;
}

// Movimentação de Estoque
export interface StockMovement {
  id: string;
  idMaterial: string;
  idExam: string;
  type: 'entrada' | 'saída';
  amount: number;
  cause: string;
  date: string;
}
