const express = require('express');
const client = require('prom-client'); // Biblioteca para expor métricas

const app = express();
const port = 3000;

// Registro das métricas
const register = new client.Registry();

// Cria uma métrica personalizada (contador)
const httpRequestCount = new client.Counter({
  name: 'http_requests_total', // Nome da métrica visível no Prometheus
  help: 'Número total de requisições HTTP recebidas pela aplicação'
});

// Registra a métrica
register.registerMetric(httpRequestCount);

// Middleware para incrementar contador a cada requisição
app.use((req, res, next) => {
  httpRequestCount.inc();
  next();
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Aplicação Node.js com métricas Prometheus!');
});

// Endpoint para Prometheus coletar métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
