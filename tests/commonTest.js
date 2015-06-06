var common = require("../lib/common");
var helper = require("../lib/helper");
var config = require("../lib/config");
var assert = require("assert");

var time = Date.now();
var appKey = config.getAppKey("android");
var platform = "android";
var str = "platform=" + platform + "&time=" + time + "&appkey=" + appKey;
var sign = helper.md5(str);

/**
 * 验签测试
 */
common.Sign({query: {time: time, platform: platform, sign: sign}}, function (result) {
    assert.equal(true, result);
});

/**
 * 验签测试 当平台为空时
 */
common.Sign({query: {time: time, platform: "", sign: sign}}, function (result) {
    assert.equal(false, result);
});

/*手机号验证操作*/
assert.equal(common.IsCellphone('13211111111'), true);
assert.equal(common.IsCellphone('15211111111'), true);
assert.equal(common.IsCellphone('1521111111'), false);
assert.equal(common.IsCellphone('25211111111'), false);

//生成token操作
assert.equal(common.CreateToken() != null, true);