// ← запуск HTTP-сервера


const http = require('http');
require('dotenv').config(); // ← можно временно закомментировать, если не используешь

const { handleGetPosts } = require('./routes/posts');

const server = http.createServer(async (req, res) => {
  if (req.url === '/posts' && req.method === 'GET') {
    return handleGetPosts(req, res);
  }
  else if (req.url === '/posts' && req.method === 'POST') {
    // return handleGetPosts(req, res);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Сервер запущен на порту ${process.env.PORT || 3000}`);
});