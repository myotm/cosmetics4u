var jwt = require('jsonwebtoken');
var config = require('../config/config.json');

exports.signUser = (email) => {
    //create  a token which expires in 24h
    var token = jwt.sign({
        email: email
    }, config.api.secret, {
        expiresIn: "24h"
    });
    
    console.log(`sign user(${email}) - return token (${token})`); // why use ` instead of '?
    return token;
}

exports.authenticateRequest = () => {
    return (req, res, next) => {
       var authToken = req.headers.authtoken;
        console.log("authToken:" + authToken);

        if (authToken) {
            // verify the token
            jwt.verify(authToken, config.api.secret, (err, decoded) => {
                if (err) {
                    res.json({ status: 'Invalid Auth Token' });
                } else {
                    var email = decoded.email;
                    console.log("module.authentication: authToken contains:" + email);
                  
                   // Further validations can be done here. Eg. check if the user (email) exists
                    req.email = email;
                    next();
                }
            });
        } else {
            res.json({ status: 'No Auth Token' });
        }
    };
}