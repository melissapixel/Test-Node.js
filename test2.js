// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса

const server = http.createServer((req, res) => {
    if (req.url === '/posts' && req.method === 'GET') {
        
        fs.readFile('posts.json', 'utf8')
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.end(data);
        })
        .catch(err => {
            // res.writeHead(500);
            // res.end(err.message);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
        })
    }

    else if (req.url === '/' && req.method === "GET") {
        res.end('Main page!');
    }
})


// 4. Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});