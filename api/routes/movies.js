/**
 * All the routes for the movies
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
movie = require('../models/movies.js');
module.exports = router;


/**
 * GET movies without paging
 */
router.get('', function (req, res) {
    getMovies(req,res);
});

/**
 * GET movies with paging
 */
router.get('/page/:page', function (req, res) {
    getMovies(req,res);
});

/**
 * Function for getting the movies
 * @param req
 * @param res
 */
function getMovies(req,res){
    token = req.headers['authorization'];
    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(err,401).json({error:"Invalid token"});
        }else {
            movie.getMovies(req,function (err, movies) {
                if(err === 400){
                    res.send(err,400);
                }
                else if (err  !== 400 && err !== null) {
                    res.send(err,404);
                }
                else {
                    res.json(movies);
                }
            });
        }
    });

}

/**
 * Function for finding a movie using its imdb id
 */
router.get('/:imdb', function (req, res) {
    token = req.headers['authorization'];
    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(err,401).json({error:"Invalid token"});
        }else {
            movie.findMovieByImdb(req,function (err, resMovie) {
                if (err) {
                    res.send(err, 404);
                }
                else {
                    res.json(resMovie);
                }
            });
        }
    });
});

//add movie
router.post("", function (req, res) {
    movie.createMovie(req, function (err) {
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