// подключаем бд
const pool = require('../db/connection');

function renderAllUsersPage(users) { 
  const usersHtml = users.map(u => `
    <div class="post">
      <h2>${(u.usernsme)}</h2>
      <p>${(u.email)}</p>
      <small>${new Date(u.created_at).toLocaleString()}</small>
    </div>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Посты</title>
  </head>
  <body>
    <h1 style="text-align: center;">All users</h1>
    ${usersHtml}
    <hr>
  </body>
  </html>`;
}


// делаем экспорт наших вынесенных функций
module.exports = { renderAllUsersPage };