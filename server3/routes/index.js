const { handleList, handleCreate, handleHome, handlePostbyId } = require('../controllers/postController');
const { handleListUsers } = require('../controllers/userController');

const routes = [
  { method: 'GET', path:  '/', handler: handleHome },
  { method: 'GET',  path: '/read-posts', handler: handleList }, // Если пришёл GET-запрос на /read-posts — вызови функцию handleList
  { method: 'GET', path: '/read-users', handler: handleListUsers },
  { method: 'GET', prefix: '/post/', handler: handlePostbyId },
  { method: 'POST', path: '/read-posts', handler: handleCreate }
];

function routeRequest(req, res) {
  // 1. Сначала проверяем статические маршруты
  for (const route of routes) {
    if (route.path && route.method === req.method && route.path === req.url) {
      return route.handler(req, res);
    }
  }

  // 2. Потом — динамические
  for (const route of routes) {
    if (route.prefix && route.method === req.method && req.url.startsWith(route.prefix)) {
      // Извлекаем ID из URL: /user/5 → 5
      const parts = req.url.split('/');
      const idStr = parts[2]; // потому что ['', 'user', '5']
      const id = Number(idStr);

      // Валидация ID
      if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Неверный ID');
      }

      // Передаём ID в обработчик
      return route.handler(req, res, id);
    }
  }

  // 404 — временно оставим здесь
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Страница не найдена');
}

module.exports = routeRequest;