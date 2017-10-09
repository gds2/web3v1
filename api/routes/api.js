var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
person = require('../models/users.js');
movie = require('../models/movies.js');
rating = require('../models/ratings.js');

//GET persons
router.get('/persons', function (req, res) {
    person.getPersons(function (err, persons) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(persons);
    })
});


router.get('/persons/:_id', function (req, res) {
    person.getPersonById(req.params._id,function (err, person) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(person);
    })
});


//POST persons
router.post("/persons", function (req, res) {
    var user = req.body;
    person.createPerson(user, function (err,user) {
        if (err) {
            console.log('Error Inserting New Data');
            if (err.name === 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
            res.sendStatus(400);
        }
        else {
            res.json(user);
        }
    })
});

router.post("/ratings", function (req, res) {
    var newRating = req.body;
    rating.createRating(newRating, function (err,newRating) {
        if (err) {
            console.log('Error Inserting New Rating');
            if (err.name === 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
            res.sendStatus(400);
        }
        else {
            res.json(newRating);
        }
    })
});



router.get('/ratings', function (req, res) {
    rating.getRatings(function (err, ratings) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(ratings);
    })
});


//GET movies
router.get('/movies', function (req, res) {
    movie.getMovies(function (err, movies) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(movies);
    })
});


//POST movies
router.post("/movies", function (req, res) {
    var newMovie = req.body;
    movie.createMovies(newMovie, function (err,movie) {
        if (err) {
            console.log('Error Inserting New Data');
            if (err.name === 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
            res.sendStatus(400);
        }
        else {
            res.json(movie);
        }
    })
});





module.exports = router;