const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const doctorResult = await db.query('SELECT * FROM doctors');
    const doctors = doctorResult.rows;

    const planLinksResult = await db.query('SELECT doctor_id, plan_id FROM doctor_plans');
    const planLinks = planLinksResult.rows;

    const enrichedDoctors = doctors.map(doctor => {
      const plansForDoctor = planLinks
        .filter(link => link.doctor_id === doctor.id)
        .map(link => link.plan_id);
      return {
        ...doctor,
        plan_ids: plansForDoctor
      };
    });

    res.json(enrichedDoctors);
  } catch (error) {
    console.error('Erro ao buscar médicos:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const { name, cpf, crm, birth_date, plan_ids = [], especialidade } = req.body;

  const doctorResult = await db.query(
    'INSERT INTO doctors (name, cpf, crm, birth_date, especialidade) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, cpf, crm, birth_date, especialidade]
  );
  const doctor = doctorResult.rows[0];

  for (const planId of plan_ids) {
    await db.query('INSERT INTO doctor_plans (doctor_id, plan_id) VALUES ($1, $2)', [doctor.id, planId]);
  }

  res.status(201).json(doctor);
};

exports.update = async (req, res) => {
  const { name, cpf, crm, birth_date, plan_ids = [], especialidade } = req.body;
  const { id } = req.params;

  const result = await db.query(
    'UPDATE doctors SET name = $1, cpf = $2, crm = $3, birth_date = $4, especialidade = $5 WHERE id = $6 RETURNING *',
    [name, cpf, crm, birth_date, especialidade, id]
  );

  await db.query('DELETE FROM doctor_plans WHERE doctor_id = $1', [id]);
  for (const planId of plan_ids) {
    await db.query('INSERT INTO doctor_plans (doctor_id, plan_id) VALUES ($1, $2)', [id, planId]);
  }

  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM doctor_plans WHERE doctor_id = $1', [id]);
  await db.query('DELETE FROM doctors WHERE id = $1', [id]);
  res.status(204).end();
};

exports.bulkInsert = async (req, res) => {
  const doctors = req.body;

  try {
    for (const doctor of doctors) {
      const {
        name,
        cpf,
        crm,
        birth_date,
        especialidade,
        plan_ids = []
      } = doctor;
    
      if (!name || !cpf || !crm || !birth_date || !especialidade) {
        throw new Error(`Dados incompletos no médico: ${name || 'Sem nome'}`);
      }
    
      const result = await db.query(
        'INSERT INTO doctors (name, cpf, crm, birth_date, especialidade) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [name, cpf, crm, birth_date, especialidade]
      );
    
      const doctorId = result.rows[0].id;

      const parsedPlanIds = Array.isArray(plan_ids)
        ? plan_ids
        : typeof plan_ids === 'string'
          ? plan_ids.split(',').map(p => parseInt(p.trim())).filter(n => !isNaN(n))
          : [];

      for (const planId of parsedPlanIds) {
        await db.query(
          'INSERT INTO doctor_plans (doctor_id, plan_id) VALUES ($1, $2)',
          [doctorId, planId]
        );
      }

      if (parsedPlanIds.length === 0 && plan_names.length > 0) {
        for (const planName of plan_names) {
          const planResult = await db.query('SELECT id FROM plans WHERE name = $1', [planName.trim()]);
          const plan = planResult.rows[0];
          if (plan) {
            await db.query(
              'INSERT INTO doctor_plans (doctor_id, plan_id) VALUES ($1, $2)',
              [doctorId, plan.id]
            );
          }
        }
      }
    }

    res.status(201).json({ message: 'Médicos importados com sucesso.' });
  } catch (error) {
    console.error('Erro ao importar médicos:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
};

exports.getDoctorPlans = async (req, res) => {
  const { id } = req.params;
  const result = await db.query(
    `SELECT plans.* FROM plans
     JOIN doctor_plans ON plans.id = doctor_plans.plan_id
     WHERE doctor_plans.doctor_id = $1`,
    [id]
  );
  res.json(result.rows);
};
