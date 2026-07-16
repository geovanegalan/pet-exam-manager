import express from 'express';
import ownerRoutes from './routes/ownerRoutes';
import petRoutes from './routes/petRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
// Criamos a nossa aplicação
const app = express();

// Dizemos qual "porta" o servidor vai escutar
const PORT = 3000;

// Ensinamos o servidor a entender JSON
app.use(express.json());
app.use('/owners', ownerRoutes);
app.use('/pets', petRoutes);
app.use('/appointments', appointmentRoutes);

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
