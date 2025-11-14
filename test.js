const fs = require('fs');

// Вариант 1: с 'utf8'
// const str = fs.readFileSync('posts.json', 'utf8');
// console.log('Тип с utf8:', typeof str); // → string

// Вариант 2: без 'utf8'
const buf = fs.readFileSync('posts.json');
console.log('Тип без utf8:', typeof buf); // → object (Buffer)
console.log('Это Buffer?', Buffer.isBuffer(buf)); // → true