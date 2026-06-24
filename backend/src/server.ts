import express from 'express';

// Criamos a nossa aplicação
const app = express();

// Dizemos qual "porta" o servidor vai escutar
// Pensa na porta como um ramal de telefone
const PORT = 3000;

// Ensinamos o servidor a entender JSON
app.use(express.json());

// Criamos nossa primeira "rota" — o endereço de boas vindas
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
