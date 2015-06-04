var express = require('express');
var router = express.Router();

var model = require("../models/model");


/* GET home page. */
router.all('/', function (req, res) {
    res.render('index', {title: 'Express'});
});


module.exports = router;
