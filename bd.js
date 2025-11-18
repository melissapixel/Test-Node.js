const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'example',
  password: '12309856', 
  port: 5432,
});

module.exports = { pool };