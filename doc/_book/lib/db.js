var conf = require("./config");
var mongoose = require('mongoose');    //引用mongoose模块
var log = require("./log");

global.db = mongoose.createConnection(conf.dbConn()); //创建一个数据库连接

/**
 * 打开数据库连接
 * @constructor
 */
exports.Open = function () {

    db.on('error', function (err) {
        log.error("数据库连接失败:" + err);
    });
    db.once('open', function () {
        log.error("数据库连接成功");
    });

    return db;
};



