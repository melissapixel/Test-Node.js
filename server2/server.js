// подключение модулей
const http = require('http'); // для создания веб-сервера

// === Подключение к БД ===
const pool = require('./db/connection');

// === 2. Функции для работы с БД ===
async function getAllPosts() { 
    const res = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return res.rows;
}
async function createPost(title, content, author) { 
    // Параметризованный запрос — безопасен от SQL-инъекций!
    const res = await pool.query(
        'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
        [title, content, author]
    );
    return res.rows[0];
 }

// === 4. Вспомогательные функции ===
function escapeHtml(text) {
    return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// === 3. Генерация HTML ===
function renderPostsPage(posts) { 
  const postsHtml = posts.map(p => `
    <div class="post">
      <h2>${escapeHtml(p.title)}</h2>
      <p>${escapeHtml(p.content)}</p>
      <p>${escapeHtml(p.author)}</p>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    </div>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Посты</title>
    <style>
      body { background:#121212; color:#e0e0e0; font-family:Arial; padding:20px; }
    </style>
  </head>
  <body>
    <h1>Публикации</h1>
    ${postsHtml}
    <hr>
    <form method="POST" action="/posts" style="margin-top:30px;">
      <input name="title" placeholder="Заголовок" style="width:100%; padding:8px; margin:4px 0; background:#2d2d2d; color:white; border:1px solid #444;">
      <input name="author" placeholder="Автор" style="width:100%; padding:8px; margin:4px 0; background:#2d2d2d; color:white; border:1px solid #444;">   
      <textarea name="content" placeholder="Текст поста" rows="4" style="width:100%; padding:8px; background:#2d2d2d; color:white; border:1px solid #444;"></textarea>
      <button type="submit" style="background:#03dac6; color:black; border:none; padding:8px 16px; cursor:pointer;">Опубликовать</button>
    </form>
  </body>
  </html>`;
}

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