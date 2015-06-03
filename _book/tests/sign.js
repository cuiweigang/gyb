var module = require("../lib/common");
var helper = require("../lib/helper");
var config = require("../lib/config");
var assert = require("assert");

var time = Date.now();
var appKey = config.getAppKey("android");
var platform = "android";
var str = time + platform + appKey;
var sign = helper.md5(str);

/**
 * 验签测试
 */
module.Sign({query: {time: time, platform: platform, sign: sign}}, function (result) {
    assert.equal(true, result);
});

/**
 * 验签测试 当平台为空时
 */
module.Sign({query: {time: time, platform: "", sign: sign}}, function (result) {
    assert.equal(false, result);
});