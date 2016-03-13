var pg = require('pg');
var connectionString = "postgres://JohnMoshakis@localhost:5432/JohnMoshakis";
var q = require('q');

function addDepartment(request,response,next) {
    next();
}

function doNothing(results) {
    var deferred = q.defer();

    setTimeout(function() {
        console.log("Waited...");
        deferred.resolve(results);    
    },1000);

    return deferred.promise;    
}

function readDepartment(id) {
    var deferred = q.defer();
    var results = [];
    
    pg.connect(connectionString, function(err, client, done) {
        
        if(err) {
          done();
        }
        else {
            var query = client.query('select id,"Name" as name from "Departments" where id = $1 ',[id], function(err, result) {
                done();

                if(err) {
                    console.log(err);
                    deferred.resolve(null);
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



function getDepartment(request,response,next) {
    var id = request.params.id;
    
    readDepartment(id)
    .then(doNothing)
    .then(function (newResponse) {
        if(newResponse != null) {
            response.send(newResponse);
            
        }
        else {
            response.send(500,{});
        }
        return next();    
    });
    
}

function getDepartments(request,response,next) {

    return next();    
}


module.exports.addDepartment = addDepartment;
module.exports.getDepartment = getDepartment;
