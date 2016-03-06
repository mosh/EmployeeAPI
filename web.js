var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var server = express();
// parse application/x-www-form-urlencoded 
server.use(bodyParser.urlencoded({ extended: false}));
// parse application/json 
server.use(bodyParser.json())

server.set('views', __dirname);

server.get('/', routes.sayHello);
server.get('/Employee', routes.newEmployee);
server.post('/api/employees', routes.addEmployee);
server.get('/api/employees', routes.getEmployees);

server.listen(8080);
