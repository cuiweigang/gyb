var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


/*用户授权信息表*/
var smsCode = new Schema({
    cellphone: {type: String},
    "smsCode": {type: String},
    "inDate": {type: Date}
});


/**
 * 获取短信验证码
 * @param platform 平台
 * @param token 用户token
 * @param callback(userId) 当用户Id存在，说明登录正常
 */
smsCode.statics.getSmsCode = function (cellphone, smsCode, callback) {
    this.findOne({cellphone: cellphone, smsCode: smsCode}).sort({'inDate': -1}).exec(function (err, item) {
        return callback(item);
    });
};

module.exports = db.model('smsCode', smsCode);
