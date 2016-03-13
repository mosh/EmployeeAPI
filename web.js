var restify = require('restify');
var helpers = require('./helpers');
var departmentRoutes = require('./department-routes');
var employeeRoutes = require('./employee-routes');
var applicationRoutes = require('./application-routes');

var server = restify.createServer();
server.get('/api/employees/:id', helpers.async(employeeRoutes.getEmployee));
server.get('/api/employees', helpers.async(employeeRoutes.getEmployees));
server.get('/api/departments/:id', helpers.async(departmentRoutes.getDepartment));
server.get('/api/departments', helpers.async(departmentRoutes.getDepartments));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


