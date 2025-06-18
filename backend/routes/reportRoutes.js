const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');

router.get('/doctors-over-50', controller.getDoctorsOver50);
router.get('/patients-by-plan', controller.getPatientsByPlan);
router.get('/patients-over-50', controller.getPatientsOver50);
router.get('/patients-with-plan-over-89', controller.getPatientsWithPlanOver89);

module.exports = router;
