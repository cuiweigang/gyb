/**
 * Created by cuiweigang on 15/6/7.
 * 验签拦截器
 */

var common = require("./common");
var model = require("../models/model");
var config = require("./config");

/**
 * 验签拦截器
 * @type {Function}
 */
exports.sign = function (req, res, next) {

    console.log("sign过滤器1");
    if (req.path == "/") {
        return next();
    }
    else {
        console.log("sign过滤器2");
        common.Sign(req, function (result) {
            if (result) {
                return next();
            }
            else {
                console.log("sign过滤器3");
                return res.signError();
            }
        });
    }
};

/**
 * 登录验证
 * @param req request
 * @param res response
 * @param next 返回
 */
exports.login = function (req, res, next) {
    var token = req.query.token;
    var platform = req.query.platform;

    if (common.isNoLoginPage(req.path)) {
        return next();
    }
    console.log("token", token, "platform", platform);
    if (!token) {
        return res.loginError();
    }

    token = new model.Types.objectId(token);

    model.OAuth.getUserId(platform, token, function (userId) {
        console.log("userId", userId);
        if (!userId) {
            return res.loginError();
        }
        else {
            // 根据用户Id获取用户信息
            model.User.findById(userId, function (err, user) {
                console.log("user", user);
                req.user = user;
                return next();
            });
        }
    });
};

