//All the routes for the users
var express = require('express');
var router = express.Router();
person = require('../models/users.js');
module.exports = router;

router.get('/user/limit/:limit',function (req, res) {
    var limit = parseInt(req.params.limit);
    person.getPersons(limit,function (err, persons) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(persons);
    })
});

//GET persons
router.get("",function (req, res) {
    person.getPersons(req,function (err, persons) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(persons);
    })
});



router.get('/:_id', function (req, res) {
    person.getPersonById(req.params._id, function (err, person) {
        if (err) {
            res.sendStatus(err);
        }
        else{
            res.json(person)
        }
    })
});

//POST persons
router.post("", function (req, res) {

    var user = req.body;
    person.createPerson(user, function (err, user) {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.json(user);
        }
    })
});