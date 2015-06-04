var mongodb = require("../../lib/db");
var model = require("../../models/model");
var assert = require("assert");
var mongoose = require("mongoose");

mongodb.Open();

/**
 * 创建用户
 */
function create() {
    var user = new model.User();
    user.name = "cui";
    user.password = "123";
    user.cellphone = "1321111111";
    user.inDate = new Date();
    user.headImg = "http://www.baidu.com";
    user.save(function (err, item) {
        assert.equal(false, err || false);
    });
}

function findByName() {
    model.User.find({name: "cui"}, function (err, items) {
        console.log(items);
    })
}

/**
 * 根据Id获取用户信息
 */
function findById() {
    model.User.find({_id: new mongoose.Types.ObjectId("556f0b3cefc892df025aca1a")}, function (err, items) {
        console.log(items);
    })
}


//create();
//findByName();
findById();