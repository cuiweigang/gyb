var user = require("./Schema/user");
var oauth = require("./Schema/oauth");
var smsCode = require("./Schema/smsCode");

var mongoose = require("mongoose");

exports.User = user;
exports.OAuth = oauth;
exports.SmsCode = smsCode;

exports.Types = {
    objectId: mongoose.Types.ObjectId
};

