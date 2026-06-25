import api from '../config/api';
import { Owner } from '../types/index';

export async function getAllOwners(): Promise<Owner[]> {
  try {
    const response = await api.get('/owners');
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar owners: ${error}`);
  }
}

export async function getOwnerById(id: string): Promise<Owner> {
  try {
    const response = await api.get(`/owners/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar owner ${id}: ${error}`);
  }
}

export async function createOwner(
  owner: Omit<Owner, 'id' | 'createdAt'>,
): Promise<Owner> {
  try {
    const response = await api.post('/owners', owner);

    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao cadastrar owner: ${error}`);
  }
}

export async function updateOwner(
  id: string,
  ownerData: Partial<Owner>,
): Promise<Owner> {
  try {
    const response = await api.put(`/owners/${id}`, ownerData);

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      `Erro ao atualizar owner ${ownerData.name}, erro: ${error}`,
    );
  }
}

export async function deleteOwner(id: string): Promise<void> {
  try {
    await api.delete(`/owners/${id}`);
  } catch (error: unknown) {
    throw new Error(`Erro ao apagar o usuario ${error}`);
  }
}
