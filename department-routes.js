var pg = require('pg');
var repository = require('./repository');

function* addDepartment(request,response,next) {
    return next();
}

function* getDepartment(request,response,next) {
    var id = request.params.id;
    
    var departments = yield repository.readDepartment(id);
    
    var obj = { 
        id : departments[0].id,
        name : departments[0].name
    };
    
    response.json(obj);
    
    return next();
    
}

function* getDepartments(request,response,next) {
    
    var departments = yield repository.readDepartments();

    response.json(departments);
    return next();    
}


module.exports.getDepartments = getDepartments;
module.exports.getDepartment = getDepartment;
