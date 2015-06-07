/**
 * Created by cuiweigang on 15/6/6.
 * 登陆注册操作
 */

var express = require('express');
var router = express.Router();
var sendResult = require("../lib/result");

var common = require("../lib/common");
var model = require("../models/model");
var async = require("async");
var helper = require("../lib/helper");

/**
 * 检测短信验证码
 * @param cellphone 手机号码
 * @param smsCode 短信验证码
 * @param callback
 */
function checkSmsCode(cellphone, smsCode, callback) {

    if (common.IsCellphone(cellphone)) {
        model.SmsCode.getSmsCode(cellphone, smsCode, function (item) {

            console.log("检测短信验证码", item);
            return callback(item != null && item.cellphone);
        });
    }
    else {
        return callback(false);
    }
};


/**
 * @api {post} /api/passport/smsCode 发送短信验证码
 * @apiVersion 1.0.0
 * @apiGroup passport
 * @apiDescription 根据手机号发送短信验证码
 *
 * @apiHeaderExample {json} 请求头
 *     {
 *       "content-type": "application/json"
 *     }
 *     或者
 *     {
 *     "content-type": "application/x-www-form-urlencoded"
 *     }
 * @apiPermission 任何用户
 * @apiParam {String} cellphone 手机号码.

 * @apiSuccessExample {json} 返回结果
 *     HTTP/1.1 200 OK
 *  {
 *      "code": 200,
 *      "message": "验证码已发送到您的手机"
 *  }
 */
router.post("/smsCode", function (req, res) {
    var cellphone = req.body.cellphone;

    /*判断手机格式
     * 正确生成验证码
     * 存醋到数据库
     * 并返回验证码
     * */
    if (common.IsCellphone(cellphone)) {

        var smsCode = new model.SmsCode();
        smsCode.inDate = Date.now();
        smsCode.smsCode = "1234";
        smsCode.cellphone = cellphone;
        smsCode.save();

        return res.send(sendResult.success(null, "验证码已发送到您的手机"));
    }
    else {
        return res.send(sendResult.parameterError("验证码错误"));
    }
});


/**
 * @api {post} /api/passport/checksmscode 检测短信验证码
 * @apiVersion 1.0.0
 * @apiGroup passport
 * @apiDescription 检测短信验证码
 *
 * @apiHeaderExample {json} 请求头
 *     {
 *       "content-type": "application/json"
 *     }
 *     或者
 *     {
 *     "content-type": "application/x-www-form-urlencoded"
 *     }
 * @apiPermission 任何用户
 * @apiParam {String} cellphone 手机号码.
 * @apiParam {String} smsCode 短信验证码.

 * @apiSuccessExample {json} 成功返回结果
 *     HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "message": "验证成功"
 *    }
 * @apiErrorExample {json} 失败返回结果
 *     HTTP/1.1 200 OK
 *    {
 *      "code": 407,
 *      "message": "验证失败"
 *    }
 */
router.post("/checkSmsCode", function (req, res) {
    var cellphone = req.body.cellphone;
    var smsCode = req.body.smscode;
    console.log(cellphone, smsCode);

    checkSmsCode(cellphone, smsCode, function (result) {
        console.log("result", result);
        var data = result ? sendResult.success(null, "验证成功") : sendResult.parameterError("验证失败");
        console.log(data);
        return res.send(data);
    });
});

/**
 * @api {post} /api/passport/register 用户注册
 * @apiVersion 1.0.0
 * @apiGroup passport
 * @apiDescription 用户注册接口
 *
 * @apiHeaderExample {json} 请求头
 *     {
 *       "content-type": "application/json"
 *     }
 *     或者
 *     {
 *     "content-type": "application/x-www-form-urlencoded"
 *     }
 * @apiPermission 任何用户
 * @apiParam {String} cellphone 手机号码.
 * @apiParam {String} password 用户密码.
 * @apiParam {String} smscode 验证码.

 * @apiSuccessExample {json} 成功返回结果
 *     HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "data": {
 *        "name": "13211111112",  用户名
 *        "token": "5573c2e7464f12990b13e976"  用户token,根据token获取用户相关信息
 *      },
 *      "message": "注册成功"
 *    }
 */
router.post("/register", function (req, res) {
    var userInfo = {
        cellphone: req.body.cellphone,
        password: req.body.password,
        smsCode: req.body.smscode
    };

    // 判断用户是否存在
    // 验证码验证
    // 注册用户
    async.waterfall([
            function (cb) {
                // 判断手机号是否存在
                model.User.existCellphone(userInfo.cellphone, function (result) {
                    var message = result ? "用户已存在" : null;

                    console.log("判断手机号是否存在", message);
                    cb(message, result);
                })
            },
            function (data, cb) {

                // 手机验证码
                checkSmsCode(userInfo.cellphone, userInfo.smsCode, function (result) {
                    var message = result ? null : "验证码错误";
                    console.log("验证码", message);
                    cb(message, result);
                });
            },
            function (result, cb) {

                // 进行用户注册
                var user = new model.User();
                user.password = helper.md5(userInfo.password);
                user.cellphone = userInfo.cellphone;
                user.name = userInfo.cellphone;
                user.inDate = Date.now();
                user.headImg = "http://pic.nipic.com/2007-11-09/200711912453162_2.jpg";
                user.platform = req.common.platform;

                user.save(function (err, item) {
                    var message = err != null ? "注册失败" : null;
                    console.log("进行用户注册", message);
                    cb(message, item);
                });
            },
            function (user, cb) {

                // 生成登录信息
                var token = model.OAuth();
                token.userId = user._id;
                token.platform = user.platform;
                token.token = common.CreateToken();
                token.inDate = Date.now();
                token.expire = token.inDate.setMonth(token.inDate.getMonth() + 1);
                token.save(function (err, tokenInfo) {
                    var message = err != null ? "注册失败" : null;

                    console.log("生成登录信息", message);
                    cb(message, {user: user, token: tokenInfo});
                });


            }
        ],
        function (err, reslut) {
            // 返回结果
            if (err) {

                console.log("err", err);
                res.send(sendResult.error(err));

            }
            else {
                var data = {
                    token: reslut.token.token,
                    name: reslut.user.name
                }

                res.send(sendResult.success(data, "注册成功"));
            }
        }
    );
})
;

/**
 * @api {post} /api/passport/login 用户登录
 * @apiVersion 1.0.0
 * @apiGroup passport
 * @apiDescription 用户登录接口
 *
 * @apiHeaderExample {json} 请求头
 *     {
 *       "content-type": "application/json"
 *     }
 *     或者
 *     {
 *     "content-type": "application/x-www-form-urlencoded"
 *     }
 * @apiPermission 任何用户
 * @apiParam {String} cellphone 手机号码.
 * @apiParam {String} password 用户密码.

 * @apiSuccessExample {json} 成功返回结果
 *     HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "data": {
 *        "name": "13211111112",
 *        "token": "5573c8f67164df0b0ca367d6"
 *      },
 *      "message": "注册成功"
 *    }
 */
router.post("/login", function (req, res) {
    var cellphone = req.body.cellphone;
    var password = helper.md5(req.body.password || "");

    async.waterfall([
            function (cb) {
                //进行登录
                model.User.getUser(cellphone, password, function (user) {
                    var message = user == null ? "用户名密码错误" : null;
                    cb(message, user);
                });
            },
            function (result, cb) {

                // 生成登录信息
                var token = model.OAuth();
                token.userId = result._id;
                token.platform = result.platform;
                token.token = common.CreateToken();
                token.inDate = Date.now();
                token.expire = token.inDate.setMonth(token.inDate.getMonth() + 1);
                token.save(function (err, token) {
                    var message = err != null ? "注册失败" : null;

                    console.log("生成登录信息", message);
                    cb(message, {user: result, token: token});
                });
            }
        ], function (err, result) {

            // 返回结果
            if (err) {

                console.log("err", err);
                res.send(sendResult.error(err));
            }
            else {
                var data = {
                    token: result.token.token,
                    name: result.user.name
                }

                res.send(sendResult.success(data, "注册成功"));
            }
        }
    );
});


module.exports = router;
