// подключаем бд
const pool = require('./connection');

const bcrypt = require('bcrypt');


// чтение всех пользователей
async function getAllUsers() { 
    const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return res.rows;
}


// регистрация пользователей
async function registerUser(userData) {
  const { username, email, password, display_name = null } = userData;

  // 1. Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль с помощью bcrypt

  // 2. Начинаем транзакцию (чтобы всё или ничего)
  const client = await pool.connect(); // Берём одно соединение из пула подключений к БД
  try {
    await client.query('BEGIN'); // всё, что дальше — делай как единое целое

    // 3. Вставляем в users
    const userRes = await client.query(
      `INSERT INTO users (username, display_name, email, hashed_password, email_verified)
       VALUES ($1, $2, $3, $4, true)
       RETURNING id`,
      [username, display_name, email, hashedPassword]
    );
    const userId = userRes.rows[0].id;

    // 4. Создаём профиль (может быть пустым)
    await client.query(
      'INSERT INTO user_profiles (user_id) VALUES ($1)',
      [userId]
    );

    // 5. вставляем настройки по умолчанию
    const defaultSettings = [
      { key: 'theme', value: 'dark' },
      { key: 'language', value: 'ru' },
      { key: 'email_notifications', value: 'true' },
      { key: 'timezone', value: 'UTC' }
    ];

    for (const { key, value } of defaultSettings) {
      await client.query(
        'INSERT INTO user_settings (user_id, setting_key, setting_value) VALUES ($1, $2, $3)',
        [userId, key, value]
      );
    }

    // 6. Завершаем транзакцию
    await client.query('COMMIT'); // Если всё прошло успешно — фиксируем изменения в БД.
    return userId;
  } catch (err) {
        await client.query('ROLLBACK');
        throw err;
  } finally {
    client.release();
  }
}

// делаем экспорт наших вынесенных функций
module.exports = { getAllUsers, registerUser };