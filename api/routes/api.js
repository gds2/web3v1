var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
person = require('../models/users.js');
movie = require('../models/movies.js');

//GET persons
router.get('/persons', function (req, res) {
    person.getPersons(function (err, persons) {
        if (err) {
            res.send(err.message);
        }
        res.json(persons);
    })
});

//GET movies
router.get('/movies', function (req, res) {
    person.getPersons(function (err, movies) {
        if (err) {
            res.send(err.message);
        }
        res.json(movies);
    })
});

//POST persons(add user)
router.post("/persons", function (req, res) {
    var user = req.body;
    person.createPerson(user, function (err,user) {
        if (err) {
            console.log('Error Inserting New User');
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
            res.send(400);
        }
        else {
            res.json(user);
        }
    })
});

//POST movies(add movie)
router.post("/movies", function (req, res) {
    var movie = req.body;
    movie.createMovie(user, function (err,newMovie) {
        if (err) {
            console.log('Error Inserting New Movie');
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
            res.send(400);
        }
        else {
            res.json(newMovie);
        }
    })
});





module.exports = router;