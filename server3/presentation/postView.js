// подключаем бд
const pool = require('../db/connection');

function renderPostsPage(posts) { 
  const postsHtml = posts.map(p => `
    <article class="post-card">
      <h2 class="post-card__title">${escapeHtml(p.title)}</h2>
      <p class="post-card__author">${escapeHtml(p.content)}</p>
      <p class="post-card__content">${escapeHtml(p.author)}</p>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    </article>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Посты</title>
  </head>
  <body>
    <h1 class="title">Публикации</h1>
    ${postsHtml}
    <hr>
    <form class="form-create__post" method="POST" action="/posts">
      <input name="title" placeholder="Заголовок">
      <input name="author" placeholder="Автор">   
      <textarea name="content" placeholder="Текст поста" rows="4"></textarea>
      <button type="submit">Опубликовать</button>
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
    <head>
      <meta charset="utf-8"><title>${(post.title)}</title>
    </head>
    <body>
      <h1 class="title">Публикация</h1>
      <article class="post-card">
        <h1 class="post-card__title">${post.title}</h1>
        <span class="post-card__author">Автор: ${post.author}</span>
        <div class="post-card__content">${post.content}</div>
        <a href="/read-posts">← Назад к списку</a>
      </article>
    </body>
  </html>`;
}

// делаем экспорт наших вынесенных функций
module.exports = { renderPostsPage, escapeHtml, renderPostPage };