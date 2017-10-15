/**
 *The model for the users
 */
var mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
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
/**
 * Exporting the userModel
 */
var userModel = module.exports = mongoose.model('users', userSchema);

/**
 * Get users from the database
 * @param req
 * @param callback
 */
module.exports.getUsers = function (req, callback) {
    //Paging
    var page = parseInt(req.params.page);
    var query = req.query;
    var pageEnd = page * 10;
    var pageStart = pageEnd - 10;
        userModel.find(query, {"password": 0}, {skip: pageStart, limit: pageEnd}, function (err, doc) {
            if (doc.length) {
                    callback(err, doc);
            }
            else {
                callback("Nothing to show");
            }
        });
};

/**
 * Create a new user
 * @param req
 * @param callback
 */
module.exports.createUser = function (req, callback) {
    var user = req.body;
    userModel.find({"username": user.username}, function (err, doc) {
        if (doc.length) {
            callback("Username already exists");
        }
        else {

            userModel.create(user, callback);
        }
    })


};

/**
 * Login with the given information
 * @param req
 * @param callback
 */
module.exports.loginUser = function (req, callback) {
    userModel.find({"username": req.body.username, "password" : req.body.password}, {
        "password" : 0,
        "username": 0,
        "name": 0,
        "lastname": 0,
        "preposition": 0
    }, function (err, doc) {
        if (doc.length) {
            var a = JSON.parse(JSON.stringify(doc));
            //var hashedPassword = a[0].password;
            //Compare passwords
            //bcrypt.compare(password, hashedPassword, function(err, res) {
                //if(res) {
                    // Passwords match
                   // a[0].password = 0;
                    callback(err, a[0]);
               // } else {
                    // Passwords don't match
                    //callback(403);
               // }
            //});
        }
        else {
            callback(403);
        }
    });

};

