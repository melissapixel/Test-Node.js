// правильно выстраивать последовательность, когда одна операция зависит от результата другой.
// TASK: создать эндпоинт GET /posts-with-authors, который возвращает посты с именами авторов.

// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса


const server = http.createServer(async(req, res) => {
    // Читаем записи от пользователей
    if (req.url === '/' && req.method === 'GET') {

        // Запускаем ОБЕ операции сразу
        const promise1 = fs.readFile('posts.json', 'utf8');
        const promise2 = fs.readFile('users.json', 'utf8');

        // 1. Ждём, пока обещания исполнятся → получаем СТРОКИ
        const postsStr = await promise1;
        const usersStr = await promise2;

        // 2. Теперь превращаем строки в МАССИВЫ
        const posts = JSON.parse(postsStr);
        const users = JSON.parse(usersStr);
        
        // представляет собой массив обьектов
        const postsWithAuthors = posts.map(post => {
            const author = users.find(u => u.id === post.userId);
            return { ...post, author: author?.name || 'Неизвестен' };
        });
        

        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(postsWithAuthors, null, 2));

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