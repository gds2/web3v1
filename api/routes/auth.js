var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var app = express();
app.set('private-key', 'takesian-deSwart');
person = require('../models/users.js');


router.post("/", function (req,res) {

    person.loginPerson(req, function (err,callback) {
        if(err){
            res = "Cannot get user";
            return;
        }
        res = callback;
        //var token = jwt.sign(user,app.get('private-key'), {
        //    expiresInMinutes: 1440 // expires in 24 hours
        //});

        //res = status(201).json({token:token});
    });
});

module.exports = router;