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
    this.find({platform: platform, token: token}, function (err, items) {
        //console.log(items);
        if (items == null || items.length <= 0) {
            return callback(null);
        }
        else {
            var item = items[0];
            //console.log("typeof", typeof(item.expire));
            if (item.expire >= Date.now()) {
                //  console.log(true);
                return callback(item.userId);
            }
            else {
                //console.log(false);
                return callback(null);
            }
        }
    });
};


module.exports = db.model('token', TokenSchema);
