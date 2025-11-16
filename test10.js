// Отправка разных ответов в зависимости от данных. Научиться отправлять разные статусы и сообщения, в зависимости от того, есть ли файл.


const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // для файлов

const server = http.createServer(async(req, res) => {

    if (req.url === '/' && req.method === 'GET') {
         // Запускаем операциию чтения
        const posts = await fs.readFile('posts.json', 'utf8');
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(posts);

    } else {
        // 404
        res.writeHead(404);
        res.end('error: "Посты не найдены"');
    }
    
})

// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});