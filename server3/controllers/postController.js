const { getAllPosts, createPost, getPostById } = require('../db/postRepository');
const { renderPostsPage, renderPostPage, renderCreatePostForm } = require('../presentation/postView');
const { wrapInLayout } = require('../views/layout');

async function handleHome(req, res) {
  try {
    // Перенаправляем на /posts (GET)
    // Код 302 — это временное перенаправление.
    res.writeHead(302, { 'Location': '/read-posts' });
    res.end();
  } catch (err) {
    res.writeHead(500).end('DB error');
  }
}

async function handleList(req, res) {
  try {
    const posts = await getAllPosts();
    const content = renderPostsPage(posts) + renderCreatePostForm(); // контент
    const html = wrapInLayout(content, 'Публикации'); // ← обёртка со стилями
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    res.writeHead(500).end('DB error');
  }
}

async function handleCreate(req, res) {
  let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        // Парсим данные формы (application/x-www-form-urlencoded)
        const params = new URLSearchParams(body); // для того, чтобы получить обьект
        const title = params.get('title')?.trim(); // params.get('title') может вернуть null (если поля нет).
        const author = params.get('author')?.trim();
        const content = params.get('content')?.trim();

        if (!title || !content) {
          res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('Заголовок и содержание обязательны');
        }

        await createPost(title, content, author);

        // Перенаправляем на (GET)
        // Код 302 — это временное перенаправление.
        res.writeHead(302, { 'Location': '/read-posts' });
        res.end();
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Не удалось создать пост');
      }
    });
    return; // гарантирует, что код ниже не выполнится (особенно важно при валидации).
}

async function handlePostbyId(req, res, id) {
 try {
    const post = await getPostById(id); // из репозитория
    if (!post) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Пользователь не найден');
    }
    const content = renderPostPage(post);
    const html = wrapInLayout(content, 'Публикация'); // ← обёртка со стилями
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    console.error(err);
    res.writeHead(500).end('Ошибка сервера');
  }
}

module.exports = { handleList, handleCreate, handleHome, handlePostbyId };