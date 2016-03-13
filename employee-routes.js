var repository = require('./repository');

function* getEmployee(request, response, next) {
    var id = request.params.id;
    
    // would normally do this in one select but I want to play with promises, yield etc
    
    var employees = yield repository.readEmployee(id);
    
    var departments = yield repository.readDepartment(employees[0].departmentId);
    
    var obj = { 
        id : employees[0].id,
        name : employees[0].name,
        department : {
            id : departments[0].id,
            name : departments[0].name
        }
    };
    
    response.json(obj);
    
    return next();
}

function* getEmployees(request, response,next) {
    
    var employees = yield repository.readEmployees();
    
    response.json(employees);
    
    return next();
}

function* updateEmployee(request,response,next) {
    
    return next();
}

/*
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
}*/

//module.exports.addEmployee = addEmployee;
module.exports.getEmployee = getEmployee;
module.exports.getEmployees = getEmployees;
//module.exports.updateEmployee = updateEmployee;

