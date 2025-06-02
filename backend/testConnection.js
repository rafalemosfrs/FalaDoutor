require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro na conexão com o banco:', err);
  } else {
    console.log('Conexão bem-sucedida! Hora atual do banco:', res.rows[0].now);
  }
  pool.end();
});
