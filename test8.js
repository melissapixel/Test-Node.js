// Задание: «Прочитать один файл и показать его содержимое». Научиться использовать один await без ошибок.

const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // для файлов

// Создание сервера
const server = http.createServer(async(req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        // Запускаем операциию чтения
        const promise = fs.readFile('text.txt', 'utf8');

        // Ждём, пока обещания исполнятся → получаем СТРОКИ
        const postsStr = await promise;

        // заголовок
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(postsStr);

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