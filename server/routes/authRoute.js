// var express = require('express');
// var router = express.Router();
// var authController = require('../controllers/authController');
// var productController = require('../controllers/productController');

// //
// router.post('/login', authController.login);
// router.post('/signup', authController.signup);


// module.exports = router;

var express = require('express');
var router = express.Router();
var httpHelper = require('../helpers/http');
var dbEntityController = require('../controllers/dbEntityController');

var entity = 'usertable';

var login = async (req, res) => {

    var user = req.body;
    try{
        var result = await dbEntityController.find(entity, { email: user.email });
        if(result.length > 0 && result[0].password){
            if (user.password === result[0].password){
                httpHelper.resResult(res, result[0]);
            }else {
                httpHelper.resError(res, 'Invalid password.');
            }
        } else {
            httpHelper.resError(res, 'Invalid username.');
        }
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

var signup = async (req, res) => {
    try{
        var user = req.body;
        if (user) {
            var createdUser = await dbEntityController.create(entity, user);
            user.email = createdUser.email;
            httpHelper.resError(res,user);
        } else {
            httpHelper.resError(res, 'Invalid User Details.');
        }
    } catch (err) {
        httpHelper.resError(res, err);
    }
}



router.post('/login', login);
router.post('/signup', signup);
module.exports = router;
