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
  appointment: Omit<Appointment, 'id' | 'createdAt' | 'protocol'>,
): Promise<Appointment> {
  try {
    const protocol = await generateProtocol();
    const response = await api.post('/appointments', {
      ...appointment,
      protocol,
    });
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao agendar: ${error}`);
  }
}

export async function updateAppointment(
  protocol: string,
  appointmentData: Partial<Appointment>,
): Promise<Appointment> {
  try {
    const appointment = await getAppointmentByProtocol(protocol);
    if (appointment.status === 'realizado')
      throw new Error(`Erro ao atualizar agendamento`);

    const id = appointment.id;
    const response = await api.patch(`/appointments/${id}`, appointmentData);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  try {
    await api.delete(`/appointments/${id}`);
  } catch (error: unknown) {
    throw new Error(`Erro ao deletar agendamento ${error}`);
  }
}

export async function cancelAppointment(
  protocol: string,
  cancelReason: string,
): Promise<void> {
  try {
    const id = (await getAppointmentByProtocol(protocol)).id;
    await api.patch(`/appointments/${id}`, {
      cancelReason: cancelReason,
      status: 'cancelado',
    });
  } catch (error: unknown) {
    throw new Error(`Erro ao cancelar agendamento: ${protocol}. ${error}`);
  }
}

export async function getAppointmentByProtocol(
  protocol: string,
): Promise<Appointment> {
  try {
    const appointments = await getAppointments();
    const appointment = appointments.find(
      (appointment) => appointment.protocol === protocol,
    );

    if (!appointment) {
      throw new Error(`Agendamento com protocolo ${protocol} não encontrado`);
    }

    return appointment;
  } catch (error: unknown) {
    throw error;
  }
}

export async function accomplishAppointment(protocol: string): Promise<void> {
  try {
    const id = (await getAppointmentByProtocol(protocol)).id;
    await api.patch(`/appointments/${id}`, {
      status: 'realizado',
    });
  } catch (erro: unknown) {
    throw new Error(`Erro ao finalizar atendimento! ${erro}`);
  }
}

async function generateProtocol(): Promise<string> {
  const appointments = await getAppointments();

  if (!appointments.length) return '1000';
  const protocols = appointments.map((p) => p.protocol);
  const lastProtocol = Number(protocols[protocols.length - 1]) + 1;
  return lastProtocol.toString();
}
