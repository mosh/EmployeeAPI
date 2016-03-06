var pg = require('pg');

var connectionString = "postgres://JohnMoshakis@localhost:5432/JohnMoshakis";

module.exports.sayHello = function (request,response) {
    response.send('Hello World...');    
};

module.exports.newEmployee = function(request,response) {
    response.render('addemployee.ejs');    
};

module.exports.addEmployee = function(request,response) {
    
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
    
};

module.exports.getEmployee = function(request,response) {
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
            if(results.length > 0)
            {
                return response.json(results[0]);
            }
            return response.status(404).json({});
        });
    });
    
};

module.exports.getEmployees = function(request,response) {
    
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
    
};