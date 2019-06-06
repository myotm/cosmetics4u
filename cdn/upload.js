var express = require('express');
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

// var upload = multer({ dest: './files/' });
var app = express();

app.use(cors());

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.get('/', cors(), function(req, res){
    res.json({msg: 'This is CORS-enabled for all origins.'});
});


app.post('/upload', cors(), upload.any(), function (req,res){
    

    res.status(200).json({
        status: "SUCCESS",
        files: req.files,
        fileCount: req.files.length
    });
    console.log(req.files);
});

app.listen(4000, function(){
    console.log('Cors enabled web server is listening at localhost:4000');
});

