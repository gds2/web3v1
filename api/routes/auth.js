var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
//var passwordHash = require('password-hash');
user = require('../models/users.js');

module.exports = router;

/**
 * Login in the system using a username and a password to get a token containing an encoded userId
 */
router.post("/", function (req,res) {
    if(req.body.username !== undefined && req.body.password !== undefined){
        user.loginUser(req, function (err, userObject) {
            if(err){
                res.status(403).json({error:"Username/password combination does not exist"});
                return;
            }else {
                var token = jwt.sign({_id :userObject._id},req.app.get('private-key'));
            }
            res.status(201).json({token:token});
        });
    }else {
        res.status(400).json({error:"Empty username or password"});
    }

});

