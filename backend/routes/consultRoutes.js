const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.post('/bulk', controller.bulkInsert);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
