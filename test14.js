// эндпоинт для создания пользователя

// Функция: получить всех пользователей
async function getAllUsers() {
    return(await fs.readFile('users.json', 'utf8'));
}

// Функция: создать пользоваателя
async function createUser(userData) {

    // 1. Читаем текущих пользователей
    let users = [];

    try {
        const data = await fs.readFile('users.json', 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        // файла нет — ок, начинаем с пустого массива
        users = [];
    }

    // 2. Генерируем id и дату
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(p => p.id)) + 1 : 1,
        createdAt: new Date().toISOString()
    };

    // 3. Добавляем в массив и сохраняем
    users.push(newUser);
    await fs.writeFile('users.json', JSON.stringify(users, null, 2));

    // 4. Возвращаем полного юзера
    return newUser;
}

// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса

const server = http.createServer(async(req, res) => {

    // Читаем записи от пользователей
    if (req.url === '/users' && req.method === 'GET') {
        const users = await getAllUsers();
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(users);
    }

    else if (req.url === '/users' && req.method === 'POST') {
        // Собираем body (это остаётся здесь!)
        let body = '';
        req.on('data', chunk => body += chunk.toString());

        req.on('end', async () => {
            try {
                const newUserData = JSON.parse(body); // данные от клиента
                const fullUser = await createUser(newUserData); // ← только данные!
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(201);
                res.end(JSON.stringify(fullUser));
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