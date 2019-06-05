var Promise = require('promise');
var httpHelper = require('../helpers/http');
var authHelper = require('../helpers/auth');


exports.login = (req, res) => {
    var user = req.body;


    var dbLogin = (fulfill, reject) => {
        global.db.user.findOne({
            email: user.email
        }, (error, foundUser) => {
            if (error) {
                reject(error);
            } else {
                if (!foundUser) {
                    reject("Email is invalid.");
                } else {
                    if(user.password !== foundUser.password){
                        reject("Password is invalid.")
                    }else{
                        fulfill(foundUser);
                    }
                }
            }
        });
    }

    new Promise(dbLogin)
        .then((user) => { 
            return new Promise((fulfill, reject) => {
                var token = authHelper.signUser(user.email);
                user.credentials = token;
                fulfill(user);
            });
         }, (error) => { httpHelper.resResult(res, error); })
        .then((result) => { httpHelper.resResult(res, result); }, (error) => { httpHelper.resResult(res, error); });  
}



exports.signup = (req, res) => {
    var user = req.body;
    
    var dbSignup = (fulfill, reject) => {
        global.db.user.insert(user, (err, result) => {
            if (err) {
                reject("Error while signup. Details: DB Error.");
            } else {
                fulfill(result);
            }
        });

    }

    new Promise(dbSignup).then((result) => {
        httpHelper.resResult(res, result);
    }, (error) => {
        httpHelper.resResult(res, error);
    });
}
