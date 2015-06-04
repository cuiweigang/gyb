var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


/*用户模型*/

var UserSchema = new Schema({
    cellphone: {type: String}, /*用户注册手机号*/
    password: {type: String}, /*密码*/
    name: {type: String}, /*用户名称*/
    headImg: {type: String}, /*用户头像*/
    inDate: {type: Date} /*增加时间*/
});


module.exports = db.model('User', UserSchema);