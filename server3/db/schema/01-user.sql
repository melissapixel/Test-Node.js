-- Тип для настроек
CREATE TYPE user_setting_key AS ENUM (
  'theme',
  'language',
  'email_notifications',
  'timezone'
);

-- Пользователи
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE CHECK (LENGTH(username) >= 3),
  display_name TEXT,
  email VARCHAR(254) NOT NULL UNIQUE,

  email_verified BOOLEAN DEFAULT false NOT NULL,
  verification_token TEXT,
  verification_expires_at TIMESTAMPTZ,

  hashed_password TEXT NOT NULL,
  reset_password_token TEXT,
  reset_password_expires_at TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true NOT NULL,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  avatar_url TEXT DEFAULT '/images/defaults/avatar.png',
  background_url TEXT DEFAULT '/images/defaults/background.jpg'
);

-- История аватарок
CREATE TABLE user_avatars (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Профиль (1:1)
CREATE TABLE user_profiles (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  location TEXT,
  website TEXT,
  birth_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Настройки
CREATE TABLE user_settings (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  setting_key user_setting_key NOT NULL,
  setting_value TEXT NOT NULL,
  PRIMARY KEY (user_id, setting_key)
);


-- ============
-- Тестовые данные
-- ============

-- Пользователь 1: Alice
INSERT INTO users (username, display_name, email, hashed_password, email_verified, created_at)
VALUES (
  'alice',
  'Alice Wonder',
  'alice@example.com',
  '$2b$10$Gk7JqZ3Y9D5U9r1QhKzF2eV7N8X4T6W1R0Y3U2I1O0P9A8S7D6F5E',
  true,
  NOW()
);

-- Пользователь 2: Bob
INSERT INTO users (username, display_name, email, hashed_password, email_verified, created_at)
VALUES (
  'bob',
  'Bob Builder',
  'bob@example.com',
  '$2b$10$L4M8N2O6P0Q4R8S2T6U0V4W8X2Y6Z0A4B8C2D6E0F4G8H2I6J0K4L8M2N',
  true,
  NOW()
);

-- История аватарок
INSERT INTO user_avatars (user_id, avatar_url)
SELECT id, '/images/avatars/alice.jpg' FROM users WHERE username = 'alice';

INSERT INTO user_avatars (user_id, avatar_url)
SELECT id, '/images/avatars/bob.png' FROM users WHERE username = 'bob';

-- Профили
INSERT INTO user_profiles (user_id, bio, location, website, birth_date)
SELECT id, 'Люблю писать код и читать книги', 'Москва, Россия', 'https://alice.blog', '1995-03-15'
FROM users WHERE username = 'alice';

INSERT INTO user_profiles (user_id, bio, location, website, birth_date)
SELECT id, 'Строю сайты и веб-приложения', 'Санкт-Петербург, Россия', 'https://bob.dev', '1992-11-22'
FROM users WHERE username = 'bob';

-- Настройки
INSERT INTO user_settings (user_id, setting_key, setting_value)
SELECT id, 'theme', 'dark' FROM users WHERE username = 'alice';

INSERT INTO user_settings (user_id, setting_key, setting_value)
SELECT id, 'language', 'ru' FROM users WHERE username = 'alice';

INSERT INTO user_settings (user_id, setting_key, setting_value)
SELECT id, 'email_notifications', 'true' FROM users WHERE username = 'alice';

INSERT INTO user_settings (user_id, setting_key, setting_value)
SELECT id, 'theme', 'light' FROM users WHERE username = 'bob';

INSERT INTO user_settings (user_id, setting_key, setting_value)
SELECT id, 'language', 'en' FROM users WHERE username = 'bob';

INSERT INTO user_settings (user_id, setting_key, setting_value)
SELECT id, 'email_notifications', 'false' FROM users WHERE username = 'bob';