// layout.js
function wrapInLayout(content, title = 'Моя платформа') {
  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>

    <link rel="icon" href="/static/images/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/static/images/favicon.ico" type="image/x-icon">

    <link rel="stylesheet" href="/static/styles/main.css">

  </head>
  <body class="d-flex flex-column min-vh-100 bg-dark text-light">
    <header class="bg-darker py-3 border-bottom border-secondary">
      <div class="container-fluid px-3 px-md-4">
        <h1 class="h4 mb-0 text-primary">Моя платформа</h1>
         <ul class="navbar-nav mr-4">
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Portfolio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Team</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Posts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
            </li>
        </ul>
         </div>
      </div>
    </header>

    <main class="flex-grow-1">
      ${content}
    </main>

    <footer class="bg-darker py-3 border-top border-secondary">
      <div class="container-fluid px-3 px-md-4 text-center text-muted">
        <small>&copy; 2025</small>
      </div>
    </footer>
  </body>
  </html>`;
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { wrapInLayout, escapeHtml };