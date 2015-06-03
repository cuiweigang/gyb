var express = require('express');
var router = express.Router();
var log = require("../lib/log");

var config = require("config");
var conf = require("../lib/config");
var mongoose = require('mongoose');    //引用mongoose模块
global.db = mongoose.createConnection("mongodb://localhost/mongoose"); //创建一个数据库连接

//db.on('error', function (err) {
//    console.log(err);
//});
//
//db.once('open', function (err) {
//    console.log(err);
//    console.log("mongodb open success!");
//});

var User = require("../modules/User");


/* GET home page. */
router.get('/', function (req, res) {
    //var user=new User();
    //user.name="cwg123";
    //user.password="1234";
    //user.save();

    res.render('index', {title: 'Express'});
});

module.exports = router;
