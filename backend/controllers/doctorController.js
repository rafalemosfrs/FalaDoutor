const db = require('../config/db');

exports.getAll = async (req, res) => {
  const result = await db.query('SELECT * FROM doctors');
  res.json(result.rows);
};

exports.create = async (req, res) => {
  const { name, cpf, crm } = req.body;
  const result = await db.query(
    'INSERT INTO doctors (name, cpf, crm) VALUES ($1, $2, $3) RETURNING *',
    [name, cpf, crm]
  );
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { name, cpf, crm } = req.body;
  const { id } = req.params;
  const result = await db.query(
    'UPDATE doctors SET name = $1, cpf = $2, crm = $3 WHERE id = $4 RETURNING *',
    [name, cpf, crm, id]
  );
  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM doctors WHERE id = $1', [id]);
  res.status(204).end();
};