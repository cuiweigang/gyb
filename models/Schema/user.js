var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


/*用户模型*/

var UserSchema = new Schema({
    cellphone: {type: String}, /*用户注册手机号*/
    password: {type: String}, /*密码*/
    name: {type: String}, /*用户名称*/
    headImg: {type: String}, /*用户头像*/
    inDate: {type: Date}, /*增加时间*/
    type: {type: Number}, /*用户类型 0:未填写 1:采购商 2：供应商 3:品牌商 4:服务商*/
    gender: {type: String}, /*性别*/
    dateOfBirth: {type: String}, /*生日*/
    Company: {type: String}, /*公司*/
    trade: {type: String},  /*行业'y*/
    job: {type: String},  /*工作职务*/
    experience: {type: String}  /*工作经历*/

});

/**
 * 判断手机号是否存在
 * @param cellphone 手机号
 * @param callback(true||false)
 */
UserSchema.statics.existCellphone = function (cellphone, callback) {
    this.findOne({cellphone: cellphone}).exec(function (err, item) {
        return callback(item != null);
    });
};

/**
 * 根据手机号和密码获取用户信息
 * @param cellphone  手机号
 * @param password 密码
 * @param callback(userInfo) 回调函数
 * @constructor
 */
UserSchema.statics.getUser = function (cellphone, password, callback) {
    this.findOne({cellphone: cellphone, password: password}).exec(function (err, item) {
        return callback(item);
    });
};

module.exports = db.model('User', UserSchema);