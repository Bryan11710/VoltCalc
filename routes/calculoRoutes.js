const express = require('express');
const router = express.Router();
const calculoController = require('../controllers/calculoController');

router.get('/todos', calculoController.getAllCalculos);

module.exports = router;