import { Router } from 'express';
import { login } from '../services/authService';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const user = req.body;
    const token = await login(user.email, user.password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: `Erro ao fazer login! ${error}` });
  }
});

export default router;
