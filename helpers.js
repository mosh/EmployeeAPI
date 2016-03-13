var q = require("q");

/* Generate asyncronous callback reference for restify route configuration */
exports.async = function (fn) {
    return function() {
        return q.async(fn).apply(null, arguments).done();
    };
};