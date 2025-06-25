const db = require('../config/db');

exports.getAll = async (req, res) => {
  const result = await db.query('SELECT * FROM patients');
  res.json(result.rows);
};

exports.create = async (req, res) => {
  const { name, cpf, birth_date, plan_id } = req.body;
const result = await db.query(
  'INSERT INTO patients (name, cpf, birth_date, plan_id) VALUES ($1, $2, $3, $4) RETURNING *',
  [name, cpf, birth_date, plan_id]
);
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { name, cpf, birth_date, plan_id } = req.body;
  const { id } = req.params;
  const result = await db.query(
    'UPDATE patients SET name = $1, cpf = $2, birth_date = $3, plan_id = $4 WHERE id = $5 RETURNING *',
    [name, cpf, birth_date, plan_id, id]
  );
  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM patients WHERE id = $1', [id]);
  res.status(204).end();
};

exports.bulkInsert = async (req, res) => {
  const patients = req.body;

  try {
    const insertPromises = patients.map(({ name, cpf, birth_date, plan_id }) => {
      return db.query(
        'INSERT INTO patients (name, cpf, birth_date, plan_id) VALUES ($1, $2, $3, $4)',
        [name, cpf, birth_date, plan_id]
      );
    });

    await Promise.all(insertPromises);
    res.status(201).json({ message: 'Pacientes importados com sucesso.' });
  } catch (error) {
    console.error('Erro ao importar pacientes:', error);
    res.status(500).json({ error: 'Erro ao importar pacientes.' });
  }
};


