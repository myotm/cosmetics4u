exports.enableCORS = (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Max-Age', '1000');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type, Authorization, Content-Length, X-Requested-With, license_key, role');
    res.setHeader('Access-Control-Allow-Credentials', true);


    if ('OPTIONS' == req.method) {
        res.sendStatus(200);	
    } else {
        next();
    }
};

exports.corsOptions = () => {
    return {
        origin: "*",
        methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
        allowedHeaders: "Cache-Control,Content-Type,Authorization,Content-Length",
        maxAge: "1000"
    };
};

exports.resResult = (res, result) => {
    res.status(200).json({
        status: "SUCCESS",
        data: result
    });
}

exports.resError = (res, error) => {
    res.status(500).json({
        status: "ERROR",
        error: error.message ? error.message : error
    });
}