const db = require('../config/db');

exports.getDoctorsOver50 = async (req, res) => {
  const result = await db.query(`
    SELECT * FROM doctors 
    WHERE EXTRACT(YEAR FROM AGE(birth_date)) > 50
  `);
  res.json(result.rows);
};

exports.getPatientsByPlan = async (req, res) => {
  const result = await db.query(`
    SELECT p.plan_id, pl.name, COUNT(*) as quantity
    FROM patients p
    JOIN plans pl ON p.plan_id = pl.id
    GROUP BY p.plan_id, pl.name
  `);
  res.json(result.rows);
};

exports.getPatientsOver50 = async (req, res) => {
  const result = await db.query(`
    SELECT * FROM patients 
    WHERE EXTRACT(YEAR FROM AGE(birth_date)) > 50
  `);
  res.json(result.rows);
};

exports.getPatientsWithPlanOver89 = async (req, res) => {
  const result = await db.query(`
    SELECT p.* FROM patients p
    JOIN plans pl ON p.plan_id = pl.id
    WHERE pl.base_value > 89
  `);
  res.json(result.rows);
};
