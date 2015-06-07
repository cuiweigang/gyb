var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


/*用户授权信息表*/

var TokenSchema = new Schema({
    userId: {type: ObjectId},
    "platform": {type: String},
    "token": {type: String},
    "expire": {type: Date},
    "inDate": {type: Date}
});


/**
 * 获取用户Id
 * @param platform 平台
 * @param token 用户token
 * @param callback(userId) 当用户Id存在，说明登录正常
 */
TokenSchema.statics.getUserId = function (platform, token, callback) {

    this.findOne({token: token, platform: platform})
        .sort({_id: -1})
        .exec(function (err, item) {
            console.log("getUserId", err, item);
            if (!item) {
                return callback(null);
            }
            else {
                console.log("getUserId_01", item);
                if (item.expire >= Date.now()) {

                    console.log("getUserId_02");
                    return callback(item.userId);
                }
                else {
                    return callback(null);
                }
            }
        });
};


module.exports = db.model('token', TokenSchema);
