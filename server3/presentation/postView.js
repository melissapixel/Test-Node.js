// подключаем бд
const pool = require('../db/connection');

function renderPostsPage(posts) { 
  const postsHtml = posts.map(p => `
    <div class="post">
      <h2>${escapeHtml(p.title)}</h2>
      <p>${escapeHtml(p.content)}</p>
      <p>${escapeHtml(p.author)}</p>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    </div>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Посты</title>
    <style>
      body { background:#121212; color:#e0e0e0; font-family:Arial; padding:20px; }
    </style>
  </head>
  <body>
    <h1>Публикации</h1>
    ${postsHtml}
    <hr>
    <form method="POST" action="/posts" style="margin-top:30px;">
      <input name="title" placeholder="Заголовок" style="width:100%; padding:8px; margin:4px 0; background:#2d2d2d; color:white; border:1px solid #444;">
      <input name="author" placeholder="Автор" style="width:100%; padding:8px; margin:4px 0; background:#2d2d2d; color:white; border:1px solid #444;">   
      <textarea name="content" placeholder="Текст поста" rows="4" style="width:100%; padding:8px; background:#2d2d2d; color:white; border:1px solid #444;"></textarea>
      <button type="submit" style="background:#03dac6; color:black; border:none; padding:8px 16px; cursor:pointer;">Опубликовать</button>
    </form>
  </body>
  </html>`;
}

function escapeHtml(text) {
    return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPostPage(post) { 
    return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>${(post.title)}</title></head>
    <body>
      <h1>${(post.title)}</h1>
      <p>Автор: ${(post.author)}</p>
      <div>${(post.content)}</div>
      <a href="/read-posts">← Назад к списку</a>
    </body>
  </html>`;
}

// делаем экспорт наших вынесенных функций
module.exports = { renderPostsPage, escapeHtml, renderPostPage };