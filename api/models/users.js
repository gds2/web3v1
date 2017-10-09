var mongoose = require('mongoose');
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

module.exports.getPersons = function (callback, limit) {
    person.find(callback).select("-password").limit(limit);
}

module.exports.createPerson = function (user, callback) {
    person.find({username: user.username}, function (err, docs) {
        if (docs.length) {
            callback("Username already exists", null);
        }
        else {
            person.create(user, callback);
        }
    });
}


module.exports.getPersonById = function (callback, id) {
    person.findById(callback, id);
}

