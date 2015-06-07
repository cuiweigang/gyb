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
 * 当成功时执行的返回结果
 * @param data
 * @param message
 * @returns {{code: (*|number), message: *, data: (*|{})}}
 * @constructor
 */
exports.success = function (data, message) {
    return basic(200, message, data);
};

/**
 * 服务端异常处理
 * @param message 错误消息
 * @returns {{code: (*|number), message: *, data: (*|{})}}
 * @constructor
 */
exports.error = function (message) {

    message = message || '服务端错误';
    return basic(500, message);
};

/**
 * 参数异常
 * @param data 数据
 * @param message 消息
 * @returns {{code: (*|number), message: *, data: (*|{})}}
 * @constructor
 */
exports.parameterError = function (message) {

    message = message || '参数错误';
    return basic(407, message);
};


