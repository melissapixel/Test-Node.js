// подключаем бд
const pool = require('./connection');

// чтение всех постов
async function getAllPosts() { 
    const res = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    return res.rows;
}

// создание поста
async function createPost(title, content, author) { 
    // Параметризованный запрос — безопасен от SQL-инъекций!
    const res = await pool.query(
        'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
        [title, content, author]
    );
    return res.rows[0];
}

async function getPostById(id) {
  // используй параметризованный запрос: SELECT * FROM users WHERE id = $1
  const res = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return res.rows[0] || null;
}


// делаем экспорт наших вынесенных функций
module.exports = { getAllPosts, createPost, getPostById };