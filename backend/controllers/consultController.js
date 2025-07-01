const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const { medico_id, paciente_id, plano_id, start_date, end_date } = req.query;
    const conditions = [];
    const values = [];

    if (medico_id) {
      values.push(medico_id);
      conditions.push(`consults.medico_id = $${values.length}`);
    }
    if (paciente_id) {
      values.push(paciente_id);
      conditions.push(`consults.paciente_id = $${values.length}`);
    }
    if (plano_id) {
      values.push(plano_id);
      conditions.push(`consults.plano_id = $${values.length}`);
    }
    if (start_date) {
      values.push(start_date);
      conditions.push(`consults."data" >= $${values.length}`);
    }
    if (end_date) {
      values.push(end_date);
      conditions.push(`consults."data" <= $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await db.query(
      `SELECT consults.*, 
              d.name AS doctor_name, 
              p.name AS patient_name, 
              pl.name AS plan_name
       FROM consults
       JOIN doctors d ON d.id = consults.medico_id
       JOIN patients p ON p.id = consults.paciente_id
       JOIN plans pl ON pl.id = consults.plano_id
       ${whereClause}
       ORDER BY "data" DESC`,
      values
    );
    console.log('Consultas encontradas:', result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    res.status(500).json({ error: 'Erro ao buscar consultas.' });
  }
};

exports.create = async (req, res) => {
  try {
    let { date, hora, medico_id, paciente_id, plano_id } = req.body;

    medico_id = parseInt(medico_id);
    paciente_id = parseInt(paciente_id);
    plano_id = parseInt(plano_id);

    if (!date || !hora || !medico_id || !paciente_id || !plano_id ) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes ou inválidos.' });
    }

    const result = await db.query(
      `INSERT INTO consults (data, hora, medico_id, paciente_id, plano_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [date, hora, medico_id, paciente_id, plano_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(500).json({ error: 'Erro ao criar consulta.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, hora, medico_id, paciente_id, plano_id } = req.body;

    const result = await db.query(
      `UPDATE consults
       SET data = $1, hora = $2, medico_id = $3, paciente_id = $4, plano_id = $5
       WHERE id = $6
       RETURNING *`,
      [date, hora, medico_id, paciente_id, plano_id, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
    res.status(500).json({ error: 'Erro ao atualizar consulta.' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM consults WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar consulta:', error);
    res.status(500).json({ error: 'Erro ao deletar consulta.' });
  }
};

exports.bulkInsert = async (req, res) => {
  const consultas = req.body;

  try {
    const insertPromises = consultas.map((c, index) => {
      const { date, hora, medico_id, paciente_id, plano_id } = c;

      if (!date || !hora || !medico_id || !paciente_id || !plano_id) {
        throw new Error(`Linha ${index + 1}: campos obrigatórios ausentes.`);
      }

      return db.query(
        `INSERT INTO consults (data, hora, medico_id, paciente_id, plano_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [date, hora, medico_id, paciente_id, plano_id]
      );
    });

    await Promise.all(insertPromises);
    res.status(201).json({ message: 'Consultas importadas com sucesso.' });
  } catch (error) {
    console.error('Erro ao importar consultas:', error.message);
    res.status(500).json({ error: error.message });
  }
};
