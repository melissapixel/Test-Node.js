// подключение модулей
const http = require('http'); // для создания веб-сервера


// server.js больше не работает с БД и HTML — он только делегирует запросы контроллерам.
// каждый файл импортирует только то, что использует напрямую.
// поэтому с 1 до 5 можно удалить
// === 1. Подключение к БД ===
// const pool = require('./db/connection');

// // === 2. Функции для работы с БД ===
// const { getAllPosts, createPost } = require('./db/postRepository');

// // === 4. Вспомогательные функции ===
// const { escapeHtml } = require('./presentation/postView');

// // === 3. Генерация HTML ===
// const { renderPostsPage } = require('./presentation/postView');

// === 5. HTTP-сервер и маршруты ===
const { handleList, handleCreate } = require('./controllers/postController');

const server = http.createServer(async (req, res) => {
  if (req.url === '/posts' && req.method === 'GET') { 
    return handleList(req, res);
   }

  if (req.url === '/posts' && req.method === 'POST') { 
    return handleCreate(req, res);
   }
  
   // --- Любые другие запросы: 404 ---
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Страница не найдена');
});

// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});