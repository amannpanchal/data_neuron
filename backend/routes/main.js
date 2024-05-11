const express = require('express');
const { create, update, count } = require('../controllers/main');
const router = express.Router();

router.route('/create').post(create);
router.route('/update/:id').put(update);
router.route('/count').get(count)

module.exports = router;