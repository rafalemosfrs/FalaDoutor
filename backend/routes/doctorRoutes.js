const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctorController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/bulk', controller.bulkInsert);
router.get('/:id/plans', controller.getDoctorPlans);

module.exports = router;