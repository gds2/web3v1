//All the routes for the movies
var express = require('express');
var router = express.Router();
movie = require('../models/movies.js');
module.exports = router;


///GET movies
router.get('', function (req, res) {
    movie.getMovies(function (err, movies) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(movies);
    })
});

//post movies HAS TO GO LATER
router.post('/movies/', function (req, res) {
    movie.createMovies(req.body,function (err, movies) {
        if (err) {
            res.sendStatus(err.message);
        }
        res.json(movies);
    })
});