

function applicationResponse(request, response,next) {
    response.send({ application: "EmployeeAPI"});
    next();
}


module.exports.applicationResponse = applicationResponse;