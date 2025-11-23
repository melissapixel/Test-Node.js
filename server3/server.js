const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const routeRequest = require('./routes');

const server = http.createServer(async (req, res) => {
  // 🔹 1. Обработка CSS (вставляем СЮДА)
  if (req.url === '/styles/main.css') {
    const filePath = path.join(__dirname, 'build', 'styles', 'main.css');
    try {
      const data = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
      return res.end(data);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('CSS not found');
    }
  }

  // 🔹 2. Всё остальное — передаём роутеру
  routeRequest(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});