/**
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
person = require('../models/users.js');
movie = require('../models/movies.js');
rater = require('../models/ratings.js');



//GET persons
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
router.get('/user?',function (req, res) {
    person.getPersons(req,function (err, persons) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(persons);
    })
});



router.get('/user/:_id', function (req, res) {
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
router.post("/user", function (req, res) {
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

//Have to edit this a bit
router.post('/ratings/:imdb', function (req, res) {
    var userId = req.body.userid;
    var ratingAmount = req.body.rating;
    var imdb = req.params.imdb;
    rater.createRating (imdb, userId, ratingAmount, function (err, newRating) {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.json(newRating);
        }
    })
});

//Has to go later
router.get('/ratings/', function (req, res) {
    rating.getAllRatings( function (err, newRating) {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.json(newRating);
        }
    })
});


/**
 * Get movies with their average rating
 */
/**
router.get('/ratings/average', function (req, res) {
    rating.getAverageRatings(function (err, newRating) {
        if (err) {
            res.sendStatus(err);
        }
        else {
            res.json(newRating);
        }
    })
})

/**
 * Needs to be edited with id from ticket
 */
/**
router.delete('/ratings/:imdb', function (req, res) {
    id = "2340001223312110";
    rating.deleteRating(req.params.imdb,id,function (err, newRating) {
        if (err) {
            res.sendStatus(err);
        }
        else {
            res.json(newRating);
        }
    })
})





router.get('/ratings', function (req, res) {
    rater.getRatings(function (err, ratings) {
        if (err) {
            res.sendStatus(err);
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

//post movies
router.post('/movies/', function (req, res) {
    movie.createMovies(req.body,function (err, movies) {
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