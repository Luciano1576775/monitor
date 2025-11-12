// server.js
const express = require('express');
const client = require('prom-client');
const app = express();

// coleta métricas padrão (CPU, heap, etc.)
client.collectDefaultMetrics({ timeout: 5000 });

// rota principal
app.get('/', (req, res) => {
  res.send('Aplicação Node.js com métricas Prometheus!');
});

// endpoint prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    const metrics = await client.register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err);
  }
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
