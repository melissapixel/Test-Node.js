// middlewarse

// Функция: получить всех пользователей
async function getAllUsers() {
    return(await fs.readFile('users.json', 'utf8'));
}

// Функция: получить всех пользователей
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
        username: userData.username,
        email: userData.email,
        createdAt: new Date().toISOString()
    };

    // 3. Добавляем в массив и сохраняем
    users.push(newUser);
    await fs.writeFile('users.json', JSON.stringify(users, null, 2));

    // 4. Возвращаем полного юзера
    return newUser;
}


// функция, которая принимает req, возвращает Promise
function getJsonBody(req) {
    // Создаётся новый Promise. 
    // resolve — функция, которую вызывают при успехе.
    // reject — функция, которую вызывают при ошибке.
    return new Promise((resolve, reject) => {
        // Создаём пустую строку, куда будем собирать куски данных
        let body = '';

        // Когда приходит кусок данных (chunk) → добавляем его в body
        // chunk — это Buffer, поэтому превращаем в строку через .toString()
        req.on('data', chunk => body += chunk.toString());

        // Когда все данные получены → срабатывает этот блок
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                req.body = data; // ← кладём в req
                resolve();       // ← ничего не возвращаем
            } catch (err) {
                reject(err);
            }
        });
  });
}


// подключение модулей
const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises; // создание промиса

const server = http.createServer(async(req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.end('Hi!');
    }

    else if (req.url === '/users' && req.method === 'GET') {
        const users = await getAllUsers();
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(users);
    }

    else if (req.url === '/users' && req.method === 'POST') {
        // 1. Собираем JSON в req.body
        await getJsonBody(req);

        // 2. Создаём пользователя из req.body
        const newUser = await createUser(req.body);

        // 3. Отправляем ответ
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(201);
        res.end(JSON.stringify(newUser));
    }

    else if (req.url === '/posts' && req.method === 'GET') {
        const users = await getAllPosts();
        // заголовок
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(users);
    }

    else if (req.url === '/posts' && req.method === 'POST') {
        // 1. Собираем JSON в req.body
        await getJsonBody(req);

        // 2. Создаём пользователя из req.body
        const newPost = await createPost(req.body);

        // 3. Отправляем ответ
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(201);
        res.end(JSON.stringify(newPost));
    }

    else {
        res.end("Not Found");
    }
})

// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});