import api from '../config/api';
import { User } from '../types/index';

export async function getAllUser(): Promise<User[]> {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar usuários! ${error}`);
  }
}

export async function getUserByID(id: string): Promise<User> {
  try {
    const user = await api.get(`/users/${id}`);
    return user.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar usuário ${id} ${error}`);
  }
}

export async function getUserByUserName(userName: string): Promise<User> {
  try {
    const user = await api.get(`/users/${userName}`);
    return user.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao buscar usuário ${userName}, ${error}`);
  }
}

export async function creatUser(user: Omit<User, 'id'>): Promise<User> {
  try {
    const response = await api.post('/users', user);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao cadastrar usuário ${error}`);
  }
}

export async function updateUser(
  userName: string,
  userData: Partial<User>,
): Promise<User> {
  try {
    const user = await getUserByUserName(userName);
    const userID = user.id;

    const response = await api.patch(`/users/${userID}`, userData);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao atualizar usuário ${userName}, ${error}`);
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (error: unknown) {
    throw new Error(`Erro ao deletar usuário ${error}`);
  }
}
