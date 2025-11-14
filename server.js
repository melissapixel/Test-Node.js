// 1. Подключаем модули
const http = require('http'); // для создания веб-сервера
const fs = require('fs'); // для файлов

// 2: Создание сервера
const server = http.createServer((req, res) => {
  if (req.url === '/posts' && req.method === 'GET') {
    fs.readFile('posts.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Ошибка сервера');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data); // data уже строка JSON
      }
    });
  } 
  
  
  // === Обработка POST /posts ===
  else if (req.url === '/posts' && req.method === 'POST') {
    // будет собирать все чаасти данных
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const newPost = JSON.parse(body);

        // Простая проверка
        if (!newPost.title || !newPost.author) {
          res.writeHead(400);
          return res.end('Нужны title и author');
        }

        // Читаем текущие посты
        fs.readFile('posts.json', 'utf8', (err, data) => {
          let posts = [];
          if (!err && data) {
            posts = JSON.parse(data);
          }

          // Создаём новый пост
          const post = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            title: newPost.title,
            content: newPost.content || '',
            author: newPost.author,
            createdAt: new Date().toISOString()
          };

          // Сохраняем
          posts.push(post);
          fs.writeFile('posts.json', JSON.stringify(posts, null, 2), (writeErr) => {
            if (writeErr) {
              res.writeHead(500);
              res.end('Ошибка записи');
            } else {
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(post, null, 2));
            }
          });
        });
      } catch (e) {
        res.writeHead(400);
        res.end('Неверный JSON');
      }
    });
  }

  // === Любой другой запрос ===
  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// 4. Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});