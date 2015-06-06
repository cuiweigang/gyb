var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conf = require("./lib/config");
var DB = require("./lib/db");
var common = require("./lib/common");
/*打开数据库连接*/
DB.Open();

var routes = require('./routes/index');
var users = require('./routes/users');
var passport = require("./routes/passport");

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

/**
 * 验签拦截器
 */
app.use(function (req, res, next) {

    if (req.path = "/") {
        return next();
    }

    common.Sign(req, function (result) {

        if (result) {

            req.Common = {
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

            return next();
        }
        else {
            var err = new Error('sign error');
            err.status = 403;
            return next(err);
        }
    });
});

/**
 * 用户登录操作
 */
app.use(function (req, res, next) {
    common.Login(req, function (isSuccess, userInfo) {

        if (isSuccess) {
            req.User = userInfo;
            return next();
        }
        else {
            var err = new Error('login error');
            err.status = 401;
            return next(err);
        }
    });
});

app.use('/', routes);
app.use('/users', users);
app.use('/api/passport', passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        err.status = err.status || 500;
        res.status(err.status);
        var error = {status: err.status, message: err.message};
        res.send(JSON.stringify(error));
    });
}
else {
// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
// 获取端口号
var port = conf.port();

/**
 * 启动服务，监听端口
 */
app.listen(port, function () {
    console.log("http://localhost:" + port);
});

module.exports = app;
