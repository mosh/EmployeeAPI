var express = require('express');
var router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(request, response) {
    return response.status(200).json({ application: "EmployeeAPI"});
});

router.get('/api', function(request, response) {
    return response.status(200).json({ application: "EmployeeAPI"});
});


module.exports = router;