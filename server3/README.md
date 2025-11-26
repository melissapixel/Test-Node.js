# Test-Node.js

## Установка

1. Установите PostgreSQL и запустите сервер.
2. Выполните:
   ```sh
   npm install

3. Создайте БД:

    psql -U postgres
    CREATE DATABASE blog;
    \q

4. Примените схему:
    psql -U postgres -d blog -f db/schema/01-initial.sql

5. Запустите сервер
    $env:DB_PASSWORD="ваш_пароль" node server.js