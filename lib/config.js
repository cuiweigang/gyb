var config = require("config");

var conf = {};

/**
 * 获取端口号
 * @returns {String} 返回端口号
 */
conf.port = function () {
    return config.get("port") || 3000;
};

/*数据库连接字符串*/
conf.dbConn = function () {
    return config.get("mongodb");
}

/**
 * 获取AppKey
 * @param platform
 */
conf.getAppKey = function (platform) {
    var appKeys = config.get("appKey");
    appKeys = appKeys || [];
    return appKeys[platform];
};

module.exports = conf;