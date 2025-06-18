const db = require('../config/db');

exports.getAll = async (req, res) => {
  const result = await db.query('SELECT * FROM doctors');
  res.json(result.rows);
};

exports.create = async (req, res) => {
  const { name, cpf, crm, birth_date } = req.body;
  const result = await db.query(
    'INSERT INTO doctors (name, cpf, crm, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, cpf, crm, birth_date]
  );
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { name, cpf, crm, birth_date } = req.body;
  const { id } = req.params;
  const result = await db.query(
    'UPDATE doctors SET name = $1, cpf = $2, crm = $3, birth_date = $4 WHERE id = $5 RETURNING *',
    [name, cpf, crm, birth_date, id]
  );
  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM doctors WHERE id = $1', [id]);
  res.status(204).end();
};
