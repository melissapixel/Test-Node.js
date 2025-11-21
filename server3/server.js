// подключение модулей
const http = require('http'); // для создания веб-сервера

const routeRequest = require('./routes')

const server = http.createServer((req, res) => {
  routeRequest(req, res);
});

// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});