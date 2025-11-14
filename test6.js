// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса


const server = http.createServer(async(req, res) => {
    // Читаем записи от пользователей
    if (req.url === '/data-fast' && req.method === 'GET') {

        // 1 СПОСОБ

        // // Запускаем ОБЕ операции сразу
        // const promise1 = fs.readFile('posts.json', 'utf8');
        // const promise2 = fs.readFile('users.json', 'utf8');

        // // Теперь ждём оба результата
        // const posts = await promise1;
        // const users = await promise2;

        // // делаем обьект
        // const result = {
        //     posts: JSON.parse(posts),
        //     users: JSON.parse(users)
        // };

        // заголовок
        // res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify(result, null, 2));



        // 2 СПОСОБ

        // → Promise.all() запускает все Promise в массиве одновременно
        // → Ждёт, пока все завершатся
        // → Возвращает массив результатов
        try {
            const [postsStr, usersStr] = await Promise.all([
                fs.readFile('posts.json', 'utf8'),
                fs.readFile('users.json', 'utf8')
            ]);

            const result = {
                posts: JSON.parse(postsStr),
                users: JSON.parse(usersStr)
            };

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result, null, 2));
        } catch (err) {
            res.writeHead(500);
            res.end('Ошибка чтения файлов');
        }

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