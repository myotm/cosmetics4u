var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');
var authHelper = require("../helpers/auth");

router.post('/create', authHelper.authenticateRequest(), productController.create);
router.get('/', authHelper.authenticateRequest(), productController.findAll);
router.get('/productname', authHelper.authenticateRequest(), productController.find);
router.delete('/:productname', authHelper.authenticateRequest(), productController.remove);
router.put('/update', authHelper.authenticateRequest(), productController.update);
router.put('/', authHelper.authenticateRequest(), productController.updateAll);

module.exports = router;