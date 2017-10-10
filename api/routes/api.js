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
        else if (person === null) {
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
            res.sendStatus(400);
        }
        else {
            res.json(user);
        }
    })
});

/**
 * Posts or edit a rating
 * This one is a bit messy because the validation from the rating schema isnt working correctly. Thats why all the validation is done in here
 */
router.post('/ratings/:imdb', function (req, res) {
    var userId = req.body.userId;
    var ratingAmount = req.body.rating;
    var jjj = req.params.imdb;
    movie.createRating(jjj, userId, ratingAmount, function (err, newRating) {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.json(newRating);
        }
    })
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
router.get('/movies/', function (req, res) {
    movie.getMovies(function (err, movies) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(movies);
    })
});

//GET movies
router.get('/movies/', function (req, res) {
    movie.getMovies(function (err, movies) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(movies);
    })
});




router.get("/movies/:imdb", function (req, res) {
    var userid = "23e424242";
    movie.shit(req.params.imdb, userid,function (err,movie) {
        if (err) {

        }
        else{
            res.json(movie);
        }

    })
});


module.exports = router;