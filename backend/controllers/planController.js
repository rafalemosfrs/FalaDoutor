const db = require('../config/db');

exports.getAll = async (req, res) => {
  const result = await db.query('SELECT * FROM plans');
  res.json(result.rows);
};

exports.create = async (req, res) => {
  const { name, base_value } = req.body;
  const result = await db.query(
    'INSERT INTO plans (name, base_value) VALUES ($1, $2) RETURNING *',
    [name, base_value]
  );
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { name, base_value } = req.body;
  const { id } = req.params;
  const result = await db.query(
    'UPDATE plans SET name = $1, base_value = $2 WHERE id = $3 RETURNING *',
    [name, base_value, id]
  );
  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM plans WHERE id = $1', [id]);
  res.status(204).end();
};
