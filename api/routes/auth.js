var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
user = require('../models/users.js');


router.post("/", function (req,res) {
    user.loginPerson(req.body.username,req.body.password, function (err, userObject) {
        if(err){
            res.status(403).json({error:"Invalid username or passowrd"});
            return;
        }else {
            var token = jwt.sign({_id :userObject._id},req.app.get('private-key'));
        }
        res.status(201).json({token:token});
    })
});

module.exports = router;