var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./helpers/db');
var httpHelper = require('./helpers/http');
var config = require('./config/config');
var helmet = require('helmet');
var morgan = require('morgan');
var cors = require('cors');
var multiparty = require('multiparty');
var multer = require('multer');



var request = require('request');
var fs = require('fs');



process.title = "Cosmetics4uApp_API";

var app = express();
var appConfig = config.get(app.get('env'));
var logStream = fs.createWriteStream(path.join(__dirname, 'logs'), { flags: 'a' })

app.use(helmet());
app.use(morgan('dev', { stream: logStream }));

// app.use(cookieParser());


app.use(httpHelper.enableCORS);
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended:true}));
app.use(cors());



//Routes
var authRoute = require('./routes/authRoute');
var userRoute = require('./routes/userRoute');
var productRoute = require('./routes/productRoute');
app.use('/v1/cosmetics4u/api/auth', authRoute);
app.use('/v1/cosmetics4u/api/user', userRoute);
app.use('/v1/cosmetics4u/api/product', productRoute);

// http error handlers
/// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not found');
    err.status = 404;
    next(err);
    console.log('err', err);
});
// production error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.send(err);
    console.log('err', err);
});

// init db connection
var db = require('./helpers/db');
db.init(appConfig.db);

// start api server
var server = app.listen(appConfig.app.port, appConfig.app.host, () => {
	console.log('Attendance api service listening on address ' + 
		server.address().address + ":"+ server.address().port);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});

process.on('SIGINT', function(){
	console.log('App exited!');
    process.exit(0);
});


// db.connect(() => {
//     var server = app.listen(appConfig.api.bindPort, appConfig.api.bindAddress, () => {
//         console.log("BootcampTraining_API SERVER listening on " + appConfig.api.bindAddress + ":", appConfig.api.bindPort);
//     })
// });
