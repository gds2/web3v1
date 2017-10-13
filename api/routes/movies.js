/**
 * All the routes for the movies
 */
var express = require('express');
var router = express.Router();
movie = require('../models/movies.js');
module.exports = router;


///GET movies without paging
router.get('', function (req, res) {
    getMovies(req,res);
});

///GET movies with paging
router.get('/page/:page', function (req, res) {
    getMovies(req,res);
});

//Function for getting the movies
function getMovies(req,res){
    movie.getMovies(req,function (err, movies) {
        if(err === 400){
            res.send(err,400);
        }
        else if (err  !== 400 && err !== null) {
            res.send(err,404);
        }
        res.json(movies);
    })
}


//post movies HAS TO GO LATER
router.post('', function (req, res) {
    movie.createMovies(req.body,function (err, movies) {
        if (err) {
            res.send(err);
        }
        res.json(movies);
    })
});