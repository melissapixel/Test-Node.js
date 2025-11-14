// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса


const server = http.createServer(async(req, res) => {
    // Читаем записи от пользователей
    if (req.url === '/' && req.method === 'GET') {

        // читаем файлы
        const posts = await fs.readFile('posts.json', 'utf8');
        const users = await fs.readFile('users.json', 'utf8');

        // делаем обьект
        const result = {
            posts: JSON.parse(posts),
            users: JSON.parse(users)
        };

        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result, null, 2));
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