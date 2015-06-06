var express = require('express');
var router = express.Router();

var model = require("../models/model");

router.get('/', function (req, res) {
    res.send("零供宝api");
});


module.exports = router;
