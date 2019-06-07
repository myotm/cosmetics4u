var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./helpers/db');
var httpHelper = require('./helpers/http');
var appConfig = require('./config/config.json');
var multiparty = require('multiparty');
var cors = require('cors');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './files/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});

process.title = "Cosmetics4uApp_API";

var app = express();


app.use(httpHelper.enableCORS);
app.use(cors());

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended:true}));

app.use(cookieParser());

//Routes
var authRoute = require('./routes/authRoute');
var userRoute = require('./routes/userRoute');
app.use('/v1/cosmetics4u/api/auth', authRoute);
app.use('/v1/cosmetics4u/api/user', userRoute);


app.use(function(req, res, next){
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});



app.post('/upload', cors(), upload.any(), function (req,res){
    

    res.status(200).json({
        status: "SUCCESS",
        files: req.files,
        fileCount: req.files.length
    });
    console.log(req.files);
});

db.connect(() => {
    var server = app.listen(appConfig.api.bindPort, appConfig.api.bindAddress, () => {
        console.log("BootcampTraining_API SERVER listening on " + appConfig.api.bindAddress + ":", appConfig.api.bindPort);
    })
});
