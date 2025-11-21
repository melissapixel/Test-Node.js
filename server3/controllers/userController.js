const { getAllUsers } = require('../db/userRepository');
const { renderAllUsersPage } = require('../presentation/allUsersView');


async function handleListUsers(req, res) {
  try {
    const users = await getAllUsers();
    const html =  renderAllUsersPage(users);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    res.end(err.message); // ← ОПАСНО! Может раскрыть структуру БД, пароли и т.д.
  }
}


module.exports = { handleListUsers };