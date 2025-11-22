const { handleList, handleCreate } = require('../controllers/postController');

const routes = [
  { method: 'GET',  path: '/posts', handler: handleList }, // Если пришёл GET-запрос на /posts — вызови функцию handleList
  { method: 'POST', path: '/posts', handler: handleCreate }
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