var mongoose = require('mongoose');
movie = require('../models/movies.js');
var personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
    ,
    preposition: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

var person = module.exports = mongoose.model('persons', personSchema);

module.exports.getPersons = function (req, callback) {

    //Paging
    var page = parseInt(req.params.page);
    var query = req.query;
    var pageEnd = page * 10;
    var pageStart = pageEnd - 10;
        person.find(query, {"password": 0}, {skip: pageStart, limit: pageEnd}, function (err, doc) {
            if (doc.length) {
                    callback(err, doc);
            }
            else {
                callback("Nothing to show");
            }
        });



}

module.exports.createPerson = function (user, callback) {
    person.find({"username": user.username}, function (err, doc) {
        if (doc.length) {
            callback("Username already exists");
        }
        else {
            person.create(user, callback);
        }
    })


}


module.exports.getPersonById = function (id, callback) {
    person.findById(id, function (err, doc) {
        if (typeof doc != 'undefined') {
            callback(err, doc);
        }
        else {
            //Not found
            callback(404);
        }
    });

}


module.exports.loginPerson = function (username, password, callback) {
    person.find({"username": username, "password": password}, {
        "password": 0,
        "username": 0,
        "name": 0,
        "lastname": 0,
        "preposition": 0
    }, function (err, doc) {
        if (doc.length) {
            var a = JSON.parse(JSON.stringify(doc));
            callback(err, a[0]);
        }
        else {
            callback(403);
        }
    });

}

