// ← обработка /posts

const { getAllPosts } = require('../services/postService');
const { renderPostsPage } = require('../views/layout');

async function handleGetPosts(req, res) {
  try {
    const posts = await getAllPosts();
    const html = renderPostsPage(posts);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Ошибка сервера');
  }
}

module.exports = { handleGetPosts };