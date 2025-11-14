// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса


const server = http.createServer(async(req, res) => {
    if (req.url === '/posts' && req.method === 'GET') {
        const posts = await fs.readFile('posts.json', 'utf8');
        console.log(posts);
        res.end(posts);

    }

    else if (req.url === '/' && req.method === "GET") {
        res.end('Main page!');
    }
})



// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});