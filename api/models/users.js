var mongoose = require('mongoose');
var personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    }
    ,
    preposition:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

});

var person = module.exports = mongoose.model('persons', personSchema);

module.exports.getPersons = function (req, callback) {
    var userName = req.query.username;
    var limit = parseInt(req.query.limit);
    var a = ["{'username':" +  "'" + userName + "}"];
        if (userName != undefined) {
            person.find(a, {"password": 0}, callback);
        }
        else{
            person.find(callback,{ skip: 10, limit: limit }).select("-password").limit(limit);
        }
}

module.exports.createPerson = function (user,callback) {
    try {
        person.create(user, callback);
    }
    catch (err){
        if(err.message === "ValidatorError"){

        }
        else{

        }
    }

}



module.exports.getPersonById = function(callback,id){
    person.findById(callback,id);
}


module.exports.loginPerson = function (username,password,callback) {
    person.findOne(callback,{"username":username, "password":password}).select("-password");

}

