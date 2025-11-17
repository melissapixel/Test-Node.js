// Вынеси логику постов в отдельную функцию. делить код на части

// Функция: получить все посты
async function getAllPosts() {
    return(await fs.readFile('posts.json', 'utf8'));
}

// Функция: создать пост
async function createPost(postData) {

    // 1. Читаем текущие посты
    let posts = [];

    try {
        const data = await fs.readFile('posts.json', 'utf8');
        posts = JSON.parse(data);
    } catch (err) {
        // файла нет — ок, начинаем с пустого массива
        posts = [];
    }

    // 2. Генерируем id и дату
    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title: postData.title,
        content: postData.content || '',
        author: postData.author,
        createdAt: new Date().toISOString()
    };

    // 3. Добавляем в массив и сохраняем
    posts.push(newPost);
    await fs.writeFile('posts.json', JSON.stringify(posts, null, 2));

    // 4. Возвращаем полный пост
    return newPost;
}

// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса

const server = http.createServer(async(req, res) => {

    // Читаем записи от пользователей
    if (req.url === '/' && req.method === 'GET') {
        const posts = await getAllPosts();
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(posts);
    }

    else if (req.url === '/' && req.method === 'POST') {
        // Собираем body (это остаётся здесь!)
        let body = '';
        req.on('data', chunk => body += chunk.toString());

        req.on('end', async () => {
            try {
                const newPostData = JSON.parse(body); // данные от клиента
                const fullPost = await createPost(newPostData); // ← только данные!
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(201);
                res.end(JSON.stringify(fullPost));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: err.message }));
            }
        });
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