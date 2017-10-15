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

