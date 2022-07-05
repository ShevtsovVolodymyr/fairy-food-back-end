const express = require('express');

const router = express.Router();

const companiesControllers = require('../controllers/companies-controller');

router.get('/', companiesControllers.getCompanies);

module.exports = router;
