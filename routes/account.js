/**
 * Created by cuiweigang on 15/6/7.
 * 账户信息
 */

var express = require('express');
var router = express.Router();
var common = require("../lib/common");
var model = require("../models/model");
var async = require("async");
var helper = require("../lib/helper");


/**
 * @api {post} /api/account/info 获取用户信息
 * @apiVersion 1.0.0
 * @apiGroup account
 * @apiDescription 获取用户信息接口
 *
 * @apiHeaderExample {json} 请求头
 *     {
 *       "content-type": "application/json"
 *     }
 *     或者
 *     {
 *     "content-type": "application/x-www-form-urlencoded"
 *     }
 * @apiPermission 登录用户
 * @apiSuccessExample {json} 成功返回结果
 *     HTTP/1.1 200 OK
 *    {
 *      "code": 200,
 *      "data": {
 *        "cellphone": "13211111113",  手机号
 *        "company": "",   公司
 *        "date_of_birth": "",  生日
 *        "experience": "",  工作经历
 *        "gender": "",  性别
 *        "head_img": "http://pic.nipic.com/2007-11-09/200711912453162_2.jpg",  头像地址
 *        "in_date": "2015-06-07T12:37:14.114Z",  注册时间
 *        "job": "",  工作职务
 *        "name": "13211111113", 用户名
 *        "trade": "", 行业
 *        "type": 0   用户类型 0:未填写 1:采购商 2：供应商 3:品牌商 4:服务商
 *      },
 *      "message": ""
 *    }
 */
router.post("/info", function (req, res) {
    var user = {
        cellphone: req.user.cellphone,
        name: req.user.name,
        head_img: req.user.headImg,
        in_date: req.user.inDate,
        type: req.user.type || 0,
        gender: req.user.gender || "",
        date_of_birth: req.user.dateOfBirth || "",
        company: req.user.Company || "",
        trade: req.user.trade || "",
        job: req.user.job || "",
        experience: req.user.experience || ""
    };

    res.sendSuccess(user, "");
});

module.exports = router;
