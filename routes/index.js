var express = require('express');
var router = express.Router();

var model = require("../models/model");

/**
 * @api {post} /login 1.登陆
 * @apiVersion 1.0.0
 * @apiGroup passport
 * @apiDescription 根据手机号和密码进行登陆
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
 * @apiParam {String} name Name of the User.
 * @apiParam {String} Age Age of the User.
 * @apiParam {String} Person Name of the User.
 * @apiParam {String} Zhege Name of the User.
 * @apiParam {String} parm Name of the User.

 * @apiSuccessExample {json} 返回结果
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John", //加班
 *       "lastname": "Doe"
 *     }
 */
router.get('/', function (req, res) {
    res.send("零供宝api");
});


module.exports = router;
