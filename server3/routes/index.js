const { handleList, handleCreate, handleHome } = require('../controllers/postController');
const { handleListUsers } = require('../controllers/userController');

const routes = [
  { method: 'GET', path: '/', handler: handleHome },
  { method: 'GET',  path: '/read-posts', handler: handleList }, // Если пришёл GET-запрос на /read-posts — вызови функцию handleList
  { method: 'GET', path: '/read-users', handler: handleListUsers },
  { method: 'POST', path: '/read-posts', handler: handleCreate }
];

function routeRequest(req, res) {
  for (const route of routes) {
    if (route.method === req.method && route.path === req.url) {
      return route.handler(req, res);
    }
  }

  // 404 — временно оставим здесь
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Страница не найдена');
}

module.exports = routeRequest;