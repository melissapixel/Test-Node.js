// fs — это встроенный модуль Node.js для работы с файловой системой (File System)
// require('fs') — «подключи этот модуль, чтобы я мог читать/писать файлы»
const fs = require('fs');

// path — ещё один встроенный модуль Node.js. Он помогает правильно строить пути к файлам на любом компьютере
const path = require('path');

// Путь к файлу. Происходит соединение пути к папке и к нужному файлу = происходит полноценный путь.
const DB_PATH = path.join(__dirname, 'posts.json');

// Читаем текущие посты
const data = fs.readFileSync(DB_PATH);
const posts = JSON.parse(data);

// Добавляем новый пост
const newPost = {
  id: posts.length + 1,
  title: "Новый пост из Node.js",
  author: "Анастасия",
  example: "Example text"
};
posts.push(newPost);

// Сохраняем обратно
fs.writeFileSync(DB_PATH, JSON.stringify(posts, null, 2));


console.log('✅ Пост добавлен!');
console.log('Теперь в базе:', posts.length, 'постов');