var express = require('express');
var bodyParser = require('body-parser');
var departmentRoutes = require('./department-routes');
var employeeRoutes = require('./employee-routes');
var applicationRoutes = require('./application-routes');

var server = express();
server.use(bodyParser.json()) // enable application/json

server.use('/api',departmentRoutes);
server.use('/api',employeeRoutes);
server.use('/', applicationRoutes);

server.listen(8080);
