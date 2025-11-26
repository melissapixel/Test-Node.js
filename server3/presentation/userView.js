function renderAllUsersPage(users) { 
  const usersHtml = users.map(u => `
    <div class="post">
      <h2>${(u.usernsme)}</h2>
      <p>${(u.email)}</p>
      <small>${new Date(u.created_at).toLocaleString()}</small>
    </div>
  `).join('');

  return `
    <h1 style="text-align: center;">All users</h1>
    ${usersHtml}
    <hr>
  `;
}

// рег пользователя
function renderRegisterPage(req, res) { 
  return `
    <form method="POST" action="/register" class="needs-validation" novalidate>
      <div class="mb-3">
        <input
          type="text"
          name="username"
          class="form-control bg-secondary text-light border-0"
          placeholder="Имя пользователя"
          required
        >
      </div>
      <div class="mb-3">
        <input
          type="email"
          name="email"
          class="form-control bg-secondary text-light border-0"
          placeholder="Email"
          required
        >
      </div>
      <div class="mb-4">
        <input
          type="password"
          name="password"
          class="form-control bg-secondary text-light border-0"
          placeholder="Пароль"
          required
        >
      </div>
      <div class="d-grid">
        <button type="submit" class="btn btn-primary btn-lg">Зарегистрироваться</button>
      </div>
    </form>
  `;
}

// делаем экспорт наших вынесенных функций
module.exports = { renderAllUsersPage, renderRegisterPage };