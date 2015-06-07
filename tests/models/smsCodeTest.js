var mongodb = require("../../lib/db");
var model = require("../../models/model");
var assert = require("assert");
var mongoose = require("mongoose");
var helper = require("../../lib/helper");

mongodb.Open();


function create() {
    var smsCode = new model.SmsCode();
    smsCode.inDate = Date.now();
    smsCode.smsCode = "3214";
    smsCode.cellphone = '15811038287';
    smsCode.save();
}

function getSmsCode() {
    var lastSmsCode = model.SmsCode.getSmsCode('15811038287', "3214", function (item) {
        console.log(item);
    });
}

// create();
getSmsCode();


