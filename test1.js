// 1. Подключаем модули
const http = require('http'); // для создания веб-сервера
const fs = require('fs'); // для файлов

const server = http.createServer((req, res) => {
    if (req.url === '/posts' && req.method === 'POST') {

        let body = '';
  
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                console.log(JSON.stringify(data));
                return res.end(JSON.stringify(data));
            } catch (e) {
                res.end("Have a problem");
            }
        });
    } else if (req.url === '/' && req.method === 'GET') {
        res.end("It's GET method");
    
        // } else if (req.url === 'posts' && req.method === "POST") {
        
    }

    else {
        res.writeHead(404);
        res.end('Not found');
    }
})

// 4. Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});