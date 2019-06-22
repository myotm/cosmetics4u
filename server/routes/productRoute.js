var express = require('express');
var router = express.Router();
var authHelper = require("../helpers/auth");
var dbEntityController = require('../controllers/dbEntityController');
var httpHelper = require("../helpers/http");
var cors = require('cors');
var multiparty = require('multiparty');


var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './files/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

var uploadStorage = multer({storage: storage});
// var uploadStorage = multer({ dest: './files/' });



var entity = 'prodtable';

var create = async (req, res) => {
    try {
        var product = req.body;
        if (product) {
            var createdProd = await dbEntityController.create(entity, product);
            product.id = createdProd.id;
            httpHelper.resResult(res, product);
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
    var id = req.params.id;
    
    try {
        var result = await dbEntityController.find(entity, { id: id });
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

var findByCategory = async (req, res) => {
    var role = req.params.role;

    try {
        var result = await dbEntityController.find(entity, { category: category });
        httpHelper.resResult(res, result);
    } catch(err) {
        httpHelper.resError(res, err);
    }
}

var upload = async (req, res, next) => {
    
    res.status(200).json({
        status: "SUCCESS",
        files: req.files,
        fileCount: req.files.length
    });
    console.log("product/upload :", fileCount);
    
}



//authHelper.authenticateRequest()

router.post('/create', create);
router.get('/findall', findAll);
router.get('/productname', find);
router.get('/category/:category', findByCategory);
router.post('/upload', uploadStorage.any(), upload);


module.exports = router;