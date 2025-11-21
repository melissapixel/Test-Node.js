// подключаем бд
const pool = require('./connection');

// чтение всех постов
async function getAllUsers() { 
    const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return res.rows;
}

// делаем экспорт наших вынесенных функций
module.exports = { getAllUsers };