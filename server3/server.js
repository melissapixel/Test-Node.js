const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const routeRequest = require('./routes');

const server = http.createServer(async (req, res) => {
  // 🔹 Обработка статических файлов: всё, что начинается с /static/
  if (req.url.startsWith('/static/')) {
    // Преобразуем URL в путь внутри папки build
    const filePath = path.join(__dirname, 'build', req.url.replace('/static/', ''));

    try {
      const data = await fs.readFile(filePath);
      let contentType = 'text/plain';
      if (filePath.endsWith('.css')) contentType = 'text/css';
      // if (filePath.endsWith('.js')) contentType = 'application/javascript';
      // if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      //   contentType = 'image/' + (filePath.endsWith('.png') ? 'png' : 'jpeg');
      // }

      res.writeHead(200, { 'Content-Type': contentType });
      return res.end(data);
    } catch (err) {
      // Если файл не найден — 404
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Файл не найден');
    }
  }

  // 🔹 Всё остальное — передаём роутеру (твой routeRequest)
  routeRequest(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});