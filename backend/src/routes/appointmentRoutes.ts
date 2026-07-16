import { Router } from 'express';
import {
  accomplishAppointment,
  cancelAppointment,
  createAppointment,
  deleteAppointment,
  getAppointmentByProtocol,
  getAppointments,
  updateAppointment,
} from '../services/appointmentService';
import { error } from 'node:console';

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json(await getAppointments()).status(200);
  } catch (error) {
    throw new Error(`Erro ao buscar agendamentos: ${error}`);
  }
});

router.get('/:protocol', async (req, res) => {
  try {
    const protocol = req.params.protocol;
    res.json(await getAppointmentByProtocol(protocol)).status(200);
  } catch (error) {
    throw new Error(`Erro ao buscar protocolo! ${error}`);
  }
});

router.post('/', async (req, res) => {
  try {
    const appointmentData = req.body;
    const appointment = await createAppointment(appointmentData);
    res.json(appointment).status(201);
  } catch (error) {
    throw new Error(`Erro ao agendar! ${error}`);
  }
});

router.patch('/accomplish/:protocol', async (req, res) => {
  try {
    const protocol = req.params.protocol;
    const accomplishedAppointment = await accomplishAppointment(protocol);
    res.json(accomplishedAppointment).status(200);
  } catch (error) {
    throw new Error(`Erro ao finalizar atendimento! ${error}`);
  }
});

router.patch('/cancel/:protocol', async (req, res) => {
  try {
    const protocol = req.params.protocol;
    const { cancelReason } = req.body;
    const canceledAppointment = await cancelAppointment(protocol, cancelReason);
    res.json(canceledAppointment).status(200);
  } catch (error) {
    throw new Error(`Erro ao cancelar agendamento! ${error}`);
  }
});

router.patch('/:protocol', async (req, res) => {
  try {
    const protocol = req.params.protocol;
    const appointmentData = req.body;
    const updatedAppointment = await updateAppointment(
      protocol,
      appointmentData,
    );
    res.json(updatedAppointment).status(200);
  } catch (error) {
    throw new Error(`Erro ao atualizar agendamento! ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAppointment(id);
    res.status(200);
  } catch (error) {
    throw new Error(`Erro ao deletar agendamento!, ${error}`);
  }
});

export default router;
