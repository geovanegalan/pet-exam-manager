import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ownerRoutes from './routes/ownerRoutes';
import petRoutes from './routes/petRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: '*',
  }),
);

// Ensinamos o servidor a entender JSON
app.use(express.json());

// Rotas Públicas sem autenticação
app.use('/auth', authRoutes);

//Rotas protegidas com autenticação
app.use('/owners', authMiddleware, ownerRoutes);
app.use('/pets', authMiddleware, petRoutes);
app.use('/appointments', authMiddleware, appointmentRoutes);

// Criamos nossa primeira "rota", o endereço de boas vindas
app.get('/', (req, res) => {
  res.json({
    message: 'Servidor do Pet Exam Manager funcionando!',
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

// Ligamos o servidor na porta escolhida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
