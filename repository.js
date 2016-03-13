var pg = require('pg');
var connectionString = "postgres://JohnMoshakis@localhost:5432/JohnMoshakis";
var q = require('q');

function readDepartments() {
    var deferred = q.defer();
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          return deferred.reject(err);
        }
        else {
            var query = client.query('select id,"Name" as name from "Departments" ',function(err, result) {
                
                // this is an error
                done();

                if(err) {
                    console.log(err);
                    return deferred.reject(err);
                }});
                
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                deferred.resolve(results);
            });
        }

    });
    return deferred.promise;
    
}

function readDepartment(id) {
    var deferred = q.defer();
    var results = [];
    
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          return deferred.reject(err);
        }
        else {
            var query = client.query('select id,"Name" as name from "Departments" where id = $1 ',[id], function(err, result) {
                
                // this is an error
                done();

                if(err) {
                    console.log(err);
                    return deferred.reject(err);
                }});
                
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                deferred.resolve(results);
            });
        }

    });
    return deferred.promise;
}


function readEmployee(id) {
    var deferred = q.defer();
    var results = [];
    
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          return deferred.reject(err);
        }
        else {
            var query = client.query('select id,"Name" as name, "departmentId" from "Employees" where id = $1 ',[id], function(err, result) {
                done();

                if(err) {
                    console.log(err);
                    return deferred.reject(null);
                }});
                
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                deferred.resolve(results);
            });
        }

    });
    return deferred.promise;
}

function readEmployees() {
    var deferred = q.defer();
    var results = [];
    
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          return deferred.reject(err);
        }
        else {
            var query = client.query('select id,"Name" as name, "departmentId" from "Employees" ',function(err, result) {
                done();

                if(err) {
                    console.log(err);
                    return deferred.reject(null);
                }});
                
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                deferred.resolve(results);
            });
        }

    });
    return deferred.promise;
}

module.exports.readDepartment = readDepartment;
module.exports.readDepartments = readDepartments;
module.exports.readEmployee = readEmployee;
module.exports.readEmployees = readEmployees;
