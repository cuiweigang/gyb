var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conf = require("./lib/config");
var DB = require("./lib/db");
var common = require("./lib/common");
var SendResult = require("./lib/sendResult");
var filter = require("./lib/filter"); // 过滤器
/*打开数据库连接*/
DB.Open();

var routes = require('./routes/index');
var passport = require("./routes/passport");
var account = require("./routes/account"); //用户账户


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("dev", 'development');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/doc", express.static(path.join(__dirname, 'doc')));

app.use(SendResult()); //注入返回消息

// 验签拦截器
app.use(filter.sign);
app.use(filter.login);

app.use(function (req, res, next) {
    req.common = {
        time: req.query.time,
        platform: req.query.platform,
        sign: req.query.sign,
        osVersion: req.query.osversion,
        macId: req.query.macid,
        imei: req.query.imei,
        wanType: req.query.wanType,
        screenWidth: req.query.screenwidth,
        screenHeight: req.query.screenheight,
        version: req.query.version,
        ip: req.query.ip,
        token: req.query.token
    };

    next();
});

app.use('/', routes);
app.use('/api/passport', passport);
app.use('/api/account', account);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("404Error");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log("error")
    err.status = err.status || 500;
    res.status(err.status);
    console.error(err.stack);
    var error = {status: err.status, message: err.message};
    res.send(error);
});


// 获取端口号
var port = conf.port();

/**
 * 启动服务，监听端口
 */
app.listen(port, function () {
    console.log("http://localhost:" + port);
});

module.exports = app;
