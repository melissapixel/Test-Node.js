// подключение модулей
const http = require('http'); // для создания веб-сервера

// === Подключение к БД ===
const pool = require('./db/connection');

// === 2. Функции для работы с БД ===
const { getAllPosts, createPost } = require('./db/postRepository');

// === 4. Вспомогательные функции ===
const { escapeHtml } = require('./presentation/postView');

// === 3. Генерация HTML ===
const { renderPostsPage } = require('./presentation/postView');

// === 4. HTTP-сервер и маршруты ===
const server = http.createServer(async (req, res) => {
  if (req.url === '/posts' && req.method === 'GET') { 
    try {
        const posts = await getAllPosts();
        const html = renderPostsPage(posts);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Ошибка базы данных');
    }
    return;
   }

  if (req.url === '/posts' && req.method === 'POST') { 
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        // Парсим данные формы (application/x-www-form-urlencoded)
        const params = new URLSearchParams(body); // для того, чтобы получить обьект
        const title = params.get('title')?.trim(); // params.get('title') может вернуть null (если поля нет).
        const author = params.get('author')?.trim();
        const content = params.get('content')?.trim();

        if (!title || !content) {
          res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('Заголовок и содержание обязательны');
        }

        await createPost(title, content, author);

        // Перенаправляем на /posts (GET)
        // Код 302 — это временное перенаправление.
        res.writeHead(302, { 'Location': '/posts' });
        res.end();
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Не удалось создать пост');
      }
    });
    return; // гарантирует, что код ниже не выполнится (особенно важно при валидации).
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