// подключаем бд
const pool = require('../db/connection');
// подключание шапки и подвала
const { escapeHtml } = require('../views/layout');


// 1. Только список постов
function renderPostsPage(posts) {
  const postsHtml = posts.map(p => `
    <div class="container-fluid px-3 px-md-4 py-2">
      <div class="card bg-dark text-light border-0">
        <div class="card-body">
          <h2 class="card-title fs-4 mb-2">${escapeHtml(p.title)}</h2>
          <p class="text-muted mb-2">Автор: ${escapeHtml(p.author)}</p>
          <div class="fs-6">${escapeHtml(p.content)}</div>
          <small class="text-muted">${new Date(p.created_at).toLocaleString()}</small>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <h1 class="text-center mb-4">Публикации</h1>
      ${postsHtml}
    </div>
  `;
}

// 2. Только форма создания поста
function renderCreatePostForm() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <div class="card bg-dark text-light border-0" style="max-width: 700px; margin: 0 auto;">
        <div class="card-body p-4">
          <h2 class="card-title text-center mb-4">Новая публикация</h2>
          <form method="POST" action="/read-posts">
            <div class="mb-3">
              <input type="text" name="title" class="form-control bg-secondary text-light border-0" placeholder="Заголовок" required>
            </div>
            <div class="mb-3">
              <input type="text" name="author" class="form-control bg-secondary text-light border-0" placeholder="Автор" required>
            </div>
            <div class="mb-4">
              <textarea name="content" class="form-control bg-secondary text-light border-0" placeholder="Текст поста" rows="6" required></textarea>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary btn-lg">Опубликовать</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

// просмотр одного поста
function renderPostPage(post) { 
    return `
      <h1 class="title">Публикация</h1>
      
      <article class="post-card">
        <h1 class="post-card__title">${post.title}</h1>
        <span class="post-card__author">Автор: ${post.author}</span>
        <div class="post-card__content">${post.content}</div>
        <a href="/read-posts">← Назад к списку</a>
      </article>
  `;
}

// делаем экспорт наших вынесенных функций
module.exports = { renderPostsPage, renderPostPage, renderCreatePostForm };