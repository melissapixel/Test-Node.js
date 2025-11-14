const http = require('http'); // для создания веб-сервера
const fs = require('fs').promises;

console.log("1. Начинаем читать файл...");

fs.readFile('posts.json', 'utf8')
  .then(data => {
    console.log("3. Файл прочитан!");
    console.log("Данные:", data.substring(0, 50) + "...");
  })
  .catch(err => {
    console.log("3. Ошибка:", err.message);
  });

console.log("2. Продолжение программы");

// 4. Запускаем сервер
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
// });