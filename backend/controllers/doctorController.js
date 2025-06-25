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

exports.bulkInsert = async (req, res) => {
  const doctors = req.body;

  try {
    const insertPromises = doctors.map(({ name, cpf, crm, birth_date }) => {
      return db.query(
        'INSERT INTO doctors (name, cpf, crm, birth_date) VALUES ($1, $2, $3, $4)',
        [name, cpf, crm, birth_date]
      );
    });

    await Promise.all(insertPromises);
    res.status(201).json({ message: 'Médicos importados com sucesso.' });
  } catch (error) {
    console.error('Erro ao importar médicos:', error);
    res.status(500).json({ error: 'Erro ao importar médicos.' });
  }
};



