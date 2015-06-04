var mongodb = require("../../lib/db");
var model = require("../../models/model");
var assert = require("assert");
var mongoose = require("mongoose");
var helper = require("../../lib/helper");

mongodb.Open();


function create() {
    var oauth = new model.OAuth();
    oauth.userId = new mongoose.Types.ObjectId("556f0b3cefc892df025aca1a");
    oauth.platform = "android";
    oauth.inDate = Date.now();
    oauth.token = helper.md5(new mongoose.Types.ObjectId());
    oauth.expire = oauth.inDate.setMonth(oauth.inDate.getMonth() + 1);
    oauth.save(function (err, items) {
        console.log(JSON.stringify((items)));
    });
}

function getUserId() {
    model.OAuth.getUserId("android", "1234567890", function (userId) {
        console.log("userId:", userId);
    });
}

//create();
//getUserId();


console.log(new mongoose.Types.ObjectId().toString());