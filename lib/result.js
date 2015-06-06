/**
 * 反悔结果基础方法
 * @param code code码
 * @param message 描述信息
 * @param data  业务数据
 * @returns {{code: (*|number), message: *, data: (*|{})}}
 */
function basic(code, message, data) {
    code = code || 200;
    data = data || {};

    return {code: code, message: message, data: data}
}

/**
 * 当成功时执行的返回结果
 * @param data
 * @param message
 * @returns {{code: (*|number), message: *, data: (*|{})}}
 * @constructor
 */
exports.Success = function (data, message) {
    return basic(200, message, data);
};

