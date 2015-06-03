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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 验签拦截器
 */
app.use(function (req, res, next) {

    common.Sign(req, function (result) {

        console.log(result);
        if (result) {
            next();
        }
        else {
            var err = new Error('sign error');
            err.status = 403;
            next(err);
        }
    });
});

app.use('/', routes);
app.use('/users', users);

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
