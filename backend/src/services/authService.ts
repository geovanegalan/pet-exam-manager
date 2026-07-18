import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import api from '../config/api';

export async function login(email: string, password: string) {
  try {
    const response = await api.get(`/users?email=${email}`);
    const users = response.data;

    if (!users.length) throw new Error(`Usuário ${email} não encontrado!`);

    const user = users[0];

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error(`Senha inválida!`);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '3h' },
    );

    return token;
  } catch (error: unknown) {
    throw error;
  }
}
