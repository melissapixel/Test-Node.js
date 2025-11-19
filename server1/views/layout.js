// ← генерация HTML

function renderPostsPage(posts) {
  const postsHtml = posts.map(p => `
    <div class="post">
      <h2>${escapeHtml(p.title)}</h2>
      <p>${escapeHtml(p.content)}</p>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    </div>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head><meta charset="utf-8"><title>Посты</title>
  <style>/* твой тёмный стиль */</style>
  </head>
  <body>
    <h1>Публикации</h1>
    ${postsHtml}
  </body>
  </html>`;
}

// Защита от XSS
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;');
}

module.exports = { renderPostsPage };