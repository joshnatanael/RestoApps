const Controller = require('../controllers/Controller');
const router = require('express').Router();
const employeeRouter = require('./employeeRouter');
const customerRouter = require('./customerRouter');

router.use('/customers', customerRouter);
router.use('/', employeeRouter);

module.exports = router;