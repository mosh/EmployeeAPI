var express = require('express');
var router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/departments', function(request, response) {
    var results = []; 
    return response.status(200).json(results);
});

router.put('/departments', function(request, response) {
    return response.status(200).json({});
});

router.post('/departments', function(request, response) {
    return response.status(201).json({});
});

module.exports = router;
