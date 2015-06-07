/**
 * 反悔结果基础方法
 * @param code code码
 * @param message 描述信息
 * @param data  业务数据
 * @returns {{code: (*|number), message: *, data: (*|{})}}
 */
function basic(code, message, data) {
    code = code || 200;

    var result = {code: code, message: message};
    if (data != null) {
        result.data = data;
    }
    return result;
}

/**
 *
 * @type {Function}
 */
exports = module.exports = function SendResult(secret, options) {
    return function SendResult(req, res, next) {
        /**
         * 成功执行成功返回消息
         * @param data 业务数据
         * @param message 消息
         */
        res.sendSuccess = function (data, message) {
            res.send(basic(200, message, data));
        };

        /**
         * 错误返回消息
         * @param message 错误消息
         */
        res.sendError = function (message) {
            message = message || '参数错误';
            res.send(basic(500, message));
        };

        /**
         * 验签失败
         */
        res.signError = function () {
            res.send(basic(403, "验签失败"));
        };

        /**
         * 登录错误
         */
        res.loginError = function () {
            res.send(basic(401, "登录超时,请重新登录"));
        };

        next();
    };
};



