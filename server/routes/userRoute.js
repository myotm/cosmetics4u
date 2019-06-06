var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authHelper = require("../helpers/auth");

router.post('/create', authHelper.authenticateRequest(), userController.create);
router.get('/', authHelper.authenticateRequest(), userController.findAll);
router.get('/username', authHelper.authenticateRequest(), userController.find);
router.delete('/:username', authHelper.authenticateRequest(), userController.remove);
router.put('/update', authHelper.authenticateRequest(), userController.update);
router.put('/', authHelper.authenticateRequest(), userController.updateAll);

module.exports = router;