// Прочитать JSON-файл и отправь его как JSON

const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // для файлов

// Создание сервера
const server = http.createServer(async(req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        // Запускаем операциию чтения
        const posts = await fs.readFile('posts.json', 'utf8');
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.end(posts);

    } else {
        // 404
        res.writeHead(404);
        res.end('Not found');
    }
});


// 4. Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});