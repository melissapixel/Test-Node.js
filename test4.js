// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса

const server = http.createServer(async(req, res) => {
    // Читаем записи от пользователей
    if (req.url === '/posts' && req.method === 'GET') {
        const posts = await fs.readFile('posts.json', 'utf8');
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.end(posts);
    }


    // вставка данных пользователем
    else if (req.url === '/posts' && req.method === "POST") {
        // собираем body
        // будет собирать все чаасти данных
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });


        req.on('end', async () => {
            try {
                const newPost = JSON.parse(body); // ← без await!
                // проверка
                const posts = JSON.parse(await fs.readFile('posts.json', 'utf8'));
                // добавить id, createdAt
                posts.push(newPost);
                await fs.writeFile('posts.json', JSON.stringify(posts, null, 2));
                // заголовок
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(201);
                res.end(JSON.stringify(newPost));
            } catch (err) {
                res.writeHead(400);
                res.end('Ошибка');
            }
        });
    }

    else {
        // 404
        res.writeHead(404);
        res.end('Not found');
    }
})



// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});