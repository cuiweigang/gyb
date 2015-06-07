var async = require("async");

var Test = function () {
    async.waterfall([
        function (cb) {
            console.log(1);
            cb("cui", 2);
        },
        function (n, cb) {
            console.log("", n);
            cb(null, 3);
        }

    ], function (err, result) {

        console.log("err", err);
        console.log("sendResult", result);

    })
}

Test();