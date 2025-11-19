// server.js
const http = require('http');
const { Pool } = require('pg');

// Настройки подключения к БД
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'example',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Простая функция, чтобы получить всех пользоваателей
async function getUsers() {
  const res = await pool.query('SELECT * FROM users ORDER BY id DESC');
  return res.rows;
}

// Создаём HTTP-сервер
const server = http.createServer(async (req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    try {
      const users = await getUsers();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(users));
    } catch (err) {
      console.error('Ошибка при получении постов:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Внутренняя ошибка сервера');
    }
    return;
  }

  // Любые другие запросы — 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Не найдено');
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});