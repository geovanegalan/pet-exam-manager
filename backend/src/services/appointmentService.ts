// export interface Appointment {
//   id: string;
//   idPet: string;
//   idOwner: string;
//   date: string;
//   examType: string;
//   status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
//   observation: string;
//   createdAt: string;
// }

import api from '../config/api';
import { Appointment } from '../types/index';

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar agendamentos: ${error}`);
  }
}

export async function createAppointment(
  appointment: Omit<Appointment, 'id' | 'creatAt'>,
): Promise<Appointment> {
  try {
    const response = await api.post('/appointments', appointment);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao agendar: ${error}`);
  }
}

export async function updateAppointment(
  id: string,
  appointmentData: Partial<Appointment>,
): Promise<Appointment> {
  try {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao atualizar agendamento: ${error}`);
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  try {
    await api.delete(`/appointments/${id}`);
  } catch (error: unknown) {
    throw new Error(`Erro ao deletar agendamento ${error}`);
  }
}
