var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./helpers/db');
var httpHelper = require('./helpers/http');
var appConfig = require('./config/config.json');


process.title = "Cosmetics4uApp_API";

var app = express();

app.use(httpHelper.enableCORS);

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended:true}));

app.use(cookieParser());

//Routes
var authRoute = require('./routes/authRoute');
app.use('/v1/cosmetics4u/api/auth', authRoute);


app.use(function(req, res, next){
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err);
});

db.connect(() => {
    var server = app.listen(appConfig.api.bindPort, appConfig.api.bindAddress, () => {
        console.log("BootcampTraining_API SERVER listening on " + appConfig.api.bindAddress + ":", appConfig.api.bindPort);
    })
});
