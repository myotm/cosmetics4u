var express = require('express');
var router = express.Router();
var dbEntityController = require('../controllers/dbEntityController');
var authHelper = require("../helpers/auth");
var httpHelper = require('../helpers/http');


// router.post('/create', authHelper.authenticateRequest(), userController.create);
// router.get('/', authHelper.authenticateRequest(), userController.findAll);
// router.get('/username', authHelper.authenticateRequest(), userController.find);
// router.delete('/:username', authHelper.authenticateRequest(), userController.remove);
// router.put('/update', authHelper.authenticateRequest(), userController.update);
// router.put('/', authHelper.authenticateRequest(), userController.updateAll);

var entity = 'usertable';

var create = async (req, res) => {
    try {
        var user = req.body;
        if (user) {
            var createdUser = await dbEntityController.create(entity, user);
            user.email = createdUser.email;
            httpHelper.resResult(res, user);
        } else {
            httpHelper.resError(res, 'Invalid user details');
        }
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

var createAll = async (req, res) => {
    try {
        var users = req.body;
        if (users && users.length > 0) {
            var newUsers = [];
            for (var i = 0; i < users.length; i++) {
                var newUser = await dbEntityController.create(entity, users[i]);
                newUsers.push(newUser);
            }
            httpHelper.resResult(res, newUsers);
        } else {
            httpHelper.resError(res, 'Invalid or empty users.');
        }
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

var find = async (req, res) => {
    var email = req.params.email;
    
    try {
        var result = await dbEntityController.find(entity, { email: email });
        httpHelper.resResult(res, result.length > 0 ? result[0] : null);
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

var findAll = async (req, res) => {
    try {
        var result = await dbEntityController.find(entity, {});
        httpHelper.resResult(res, result);
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

var findByRole = async (req, res) => {
    var role = req.params.role;

    try {
        var result = await dbEntityController.find(entity, { role: role });
        httpHelper.resResult(res, result);
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

// var findStudentsByCriteria = async (req, res) => {
//     var intake = req.params.intake;
//     var intakeModule = req.params.module;
//     var criteria = {
//         role: 'STUDENT',
//         intake: intake,
//         modules: intakeModule
//     }

//     try {
//         var result = await dbEntityController.find(entity, criteria);
//         httpHelper.res(res, result);
//     } catch(err) {
//         httpHelper.err(res, err);
//     }
// }

router.post('/create', authHelper.authenticateRequest(), create);
router.post('/createAll', authHelper.authenticateRequest(), createAll);
router.get('/:username', authHelper.authenticateRequest(), find);
router.get('/', authHelper.authenticateRequest(), findAll);
router.get('/role/:role', authHelper.authenticateRequest(), findByRole);
// router.get('/students/:intake/:module', findStudentsByCriteria)

module.exports = router;