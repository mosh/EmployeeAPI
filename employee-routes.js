var pg = require('pg');

var connectionString = "postgres://JohnMoshakis@localhost:5432/JohnMoshakis";

function getEmployee(request, response, next) {
    var id = request.params.id;
    
    var results = [];
    
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          console.log(err);
          response.status(500);
          return response.json({ success: false, data: err});
        }

        var query = client.query('select id,"Name" as name from "Employees" where id = $1 ',[id], function(err, result) {
            done();

            if(err) {
                console.log(err);
                response.status(500);
                return response.json({ success: false, data: err});
            }});

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return response.json(results[0]);
        });
    });
    
    
    return next();
}

function getEmployees(request, response,next) {
    
    var results = [];
    
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          console.log(err);
          return response.status(500).json({ success: false, data: err});
        }

        var query = client.query('select id,"Name" as name from "Employees" ', function(err, result) {
            done();

            if(err) {
                console.log(err);
                return response.status(500).json({ success: false, data: err});
            }});

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return response.json(results);
        });
    });
    next();
}

function updateEmployee(request,response,next) {
    return next();
}

function addEmployee(request,response,next) {

    var name = request.body.name
    
     pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
          console.log(err);
          return response.status(500).json({ success: false, data: err});
        }
        var query = client.query('INSERT INTO "Employees" ("Name") values($1)', [name], function(err, result) {
            done();

            if(err) {
                console.log(err);
                return response.status(500).json({ success: false, data: err});
            }
        });


        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return response.status(201).json({ success: true});
        });
    });
    
    next();
}

module.exports.addEmployee = addEmployee;
module.exports.getEmployee = getEmployee;
module.exports.getEmployees = getEmployees;
module.exports.updateEmployee = updateEmployee;

