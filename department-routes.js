var express = require('express');
var router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/api/departments', function(request, response) {
});

router.put('/api/departments', function(request, response) {
});

router.post('/api/departments', function(request, response) {
});
