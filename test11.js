// Разные действия на один URL
// Научиться обрабатывать GET и POST на одном пути — /posts.

const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // для файлов

const server = http.createServer(async(req, res) => {

    if (req.url === '/posts' && req.method === 'GET') {
         // Запускаем операциию чтения
        const posts = await fs.readFile('posts.json', 'utf8');
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(posts);

    } else if (req.url === '/posts' && req.method === 'POST') {

        // собираем body
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', async () => {
            try {
                const newPost = JSON.parse(body); // ← без await!
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(201);
                res.end(JSON.stringify(newPost));
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(400);
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    }
    
    else {
        // 404
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end("ошибка");
    }
    
})

// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});