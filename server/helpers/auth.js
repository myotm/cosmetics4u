var jwt = require('jsonwebtoken');
var config = require('../config/config.json');

exports.authenticateRequest = () => {
    return (req, res, next) => {
       var authToken = req.headers.authtoken;
        console.log("authToken:" + authToken);

        if (authToken) {
            // verify the token
            console.log("AUTH TOKEN---------------", authToken);
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