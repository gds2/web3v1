/**
 * All the routes for the users
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
user = require('../models/users.js');
module.exports = router;


/**
 * //Get users with paging
 */
router.get('/page/:page',function (req, res) {
    getUsers(req,res);
});

/**
 * Get users without paging
 */
router.get("",function (req, res) {
    getUsers(req,res);
});

/**
 * Function for getting the users
 * @param req
 * @param res
 */
function getUsers(req,res){
    token = req.headers['authorization'];
    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(401);
        }else {
            user.getUsers(req,function (err, persons) {
        if (err) {
            res.send(err,404);
        }else {
            res.json(persons);
        }
    });
        }
    });

}


/**
 * Creating a new user
 */
router.post("", function (req, res) {
    user.createUser(req, function (err) {
        //Send a 400 code if an error occured
        if (err) {
            res.send(400, err);
        }
        //Send a 200 code if everything went right
        else {
            res.sendStatus(200);
        }
    })
});