const express = require('express');
const router = express.Router();
const controller = require('../controllers/planController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/bulk', controller.bulkInsert);

module.exports = router;
