const { getAllUsers, registerUser } = require('../db/userRepository');
const { renderAllUsersPage, renderRegisterPage } = require('../presentation/userView');
const { wrapInLayout } = require('../views/layout');


// просмотр всех пользователей
async function handleListUsers(req, res) {
  try {
    const users = await getAllUsers();
    const content = renderAllUsersPage(users); // контент
    const html = wrapInLayout(content, 'Все пользователи'); // ← обёртка со стилями
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    res.end(err.message); // ← ОПАСНО! Может раскрыть структуру БД, пароли и т.д.
  }
}

// форма регистрации пользователя
async function handleRegisterForm(req, res) {
  try {
    const content = renderRegisterPage(); // контент
    const html = wrapInLayout(content, 'Регистрация'); // ← обёртка со стилями
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    res.end(err.message); // ← ОПАСНО! Может раскрыть структуру БД, пароли и т.д.
  }
}

// процесс рег пользователя
async function handleRegisterProcess(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const params = new URLSearchParams(body);
      const username = params.get('username')?.trim();
      const email = params.get('email')?.trim();
      const password = params.get('password')?.trim();
      const display_name = params.get('display_name')?.trim();

      // Валидация
      if (!username || !email || !password) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Все поля обязательны');
      }

      // Регистрация
      await registerUser({ username, email, password, display_name });

      // Перенаправление на страницу входа или профиля
      res.writeHead(302, { Location: '/read-users' });
      res.end();
    } catch (err) {
      console.error('Ошибка регистрации:', err);

      // Проверка на уникальность (PostgreSQL error code)
      if (err.code === '23505') { // unique_violation
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Пользователь с таким именем или email уже существует');
      }

      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Не удалось зарегистрироваться');
    }
  });
}

module.exports = { handleListUsers, handleRegisterProcess, handleRegisterForm };