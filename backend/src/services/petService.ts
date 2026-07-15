import api from '../config/api';
import { Pet } from '../types/index';

export async function getAllPets(): Promise<Pet[]> {
  try {
    const response = await api.get('/pets');
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar pets: ${error}`);
  }
}

export async function getPetByID(id: string): Promise<Pet> {
  try {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar pet ${id}, error: ${error}`);
  }
}

export async function createPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
  try {
    const response = await api.post('/pets', pet);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao cadastrar pet: ${error}`);
  }
}

export async function updatePet(
  id: string,
  petData: Partial<Pet>,
): Promise<Pet> {
  try {
    const response = await api.patch(`/pets/${id}`, petData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao atualizar Pet ${petData.name}, erro: ${error}`);
  }
}

export async function deletePet(id: string): Promise<void> {
  try {
    await api.delete(`/pets/${id}`);
  } catch (error: unknown) {
    throw new Error(`Erro ao apagar o Pet ${error}`);
  }
}

export async function getPetByName(nome: string): Promise<Pet> {
  try {
    const response = await api.get(`/pets?nome=${nome}`);
    const pets = response.data;

    if (!pets[0]) {
      throw new Error(`Nenhum pet com o nome ${nome} foi encontrado!`);
    }

    return pets[0];
  } catch (error: unknown) {
    throw error;
  }
}
