var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
person = require('../models/users.js');


router.post("/", function (req,res) {
    person.loginPerson(req.body.username,req.body.password, function (err,callback) {
        if(err){
            res.status(404).json({error:"Invalid username or passowrd"});
            return;
        }else {
            var token = jwt.sign(callback,req.app.get('private-key'), {
                expiresInMinutes: 1440
            });
        }
        res.status(201).json({token:token});

    })
});

module.exports = router;