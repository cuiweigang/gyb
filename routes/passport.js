/**
 * Created by cuiweigang on 15/6/6.
 * 登陆注册操作
 */

var express = require('express');
var router = express.Router();


var common = require("../lib/common");

/**
 * @api {post} /api/passport/smscode 发送短信验证码
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
router.all("/smscode", function (req, res) {
    var cellphone = req.body.cellphone;

    /*判断手机格式
     * 正确生成验证码
     * 存醋到数据库
     * 并返回验证码
     * */
    if (common.IsCellphone(cellphone)) {
        res.send({
            code: 200, message: '验证码已发送到您的手机'
        })
    }
    else {
        res.send({
            code: 407, message: '验证码错误'
        })
    }
});


router.post("/checksmscode", function (req, res) {
    var cellphone = req.body.cellphone;
});

router.post("/register", function (req, res) {

});



router.post("/login", function (req, res) {
    var cellphone = req.body.cellphone;
    var password = req.body.password;
});


module.exports = router;
