// ← работа с БД (CRUD)

const pool = require('../utils/db');

async function getAllPosts() {
  const res = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return res.rows;
}

async function createPost(title, content) {
  // Параметризованный запрос — безопасен от SQL-инъекций!
  const res = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return res.rows[0];
}

module.exports = { getAllPosts, createPost };