var restify = require('restify');
var departmentRoutes = require('./department-routes');
var employeeRoutes = require('./employee-routes');
var applicationRoutes = require('./application-routes');

var server = restify.createServer();
server.get('/api/employees/:id', employeeRoutes.getEmployee);
server.get('/api/employees', employeeRoutes.getEmployees);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


