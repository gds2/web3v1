/**
 * All the routes for the users
 */
var express = require('express');
var router = express.Router();
user = require('../models/users.js');
module.exports = router;

//Get persons with paging
router.get('/page/:page',function (req, res) {
    getUsers(req,res);
});

//GET persons without paging
router.get("",function (req, res) {
    getUsers(req,res);
});

//Function for getting the users
function getUsers(req,res){
    user.getUsers(req,function (err, persons) {
        if (err) {
            res.send(err,404);
        }
        res.json(persons);
    })
}



//Creating a new user
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