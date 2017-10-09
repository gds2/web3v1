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
    person.getPersonById(req.params._id, function (err, person) {
        if (err) {
            res.sendStatus(err.message);
        }
        else if(person === null){
            res.sendStatus(404);
        }
        else {
            res.json(person);
        }
    })
});


//POST persons
router.post("/persons", function (req, res) {
    var user = req.body;
    person.createPerson(user, function (err, user) {
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

/**
 * Posts or edit a rating
 * This one is a bit messy because the validation from the rating schema isnt working corrrectly. Thats why all the validation is done in here
 */
router.post('/ratings/:imdb', function (req, res) {
    var userId = req.body.userId;
    var ratingAmount = req.body.rating;
    //Check if the
    if (typeof userId != 'undefined' && typeof ratingAmount != 'undefined' && typeof ratingAmount === "number") {
        if (ratingAmount > 0.4 && ratingAmount < 5.1) {
            var newRating = {"userId": req.body.userId, "rating": req.body.rating};
            var jjj = req.params.imdb;
            movie.createRating(jjj, newRating, function (err, newRating) {
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
        }
        else{
            res.sendStatus(400);
        }
    }
    else {
        res.sendStatus(400);
    }
});


function controlRating(userid, rating) {

    if (userid === undefined || rating === undefined) {
        throw err;
    }
}


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
    movie.createMovies(newMovie, function (err, movie) {
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