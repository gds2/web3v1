/**
 * All the routes for the ratings
 */
var express = require('express');
var router = express.Router();
rater = require('../models/ratings.js');
module.exports = router;


//User id is used in create rating so do something with the ticket there
router.post("/", function (req, res) {
    rater.createRating (req, function (err) {
        if (err) {
            if(err === "Movie not found"){
                res.send(err,404);
            }else {
                res.send(err,400);
            }
        }
        else {
            res.sendStatus(200);
        }
    })
});

//Has to go later
router.get('', function (req, res) {
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
 * Get movies with their average rating without paging
 */
router.get('/average', function (req, res) {
    getAverage(req,res);
});

/**
 * Function for getting the average rating per movie
 * @param req
 * @param res
 */
function getAverage(req,res) {
    rating.getAverageRatings(req,function (err, newRating) {
        if (err) {
            res.send(err,404);
        }
        else {
            res.json(newRating);
        }
    })
}
/**
 * Get movies with their average rating with paging
 */
router.get('/average/page/:page', function (req, res) {
    getAverage(req,res);
});

/**
 * Needs to be edited with id from ticket
 */
router.delete('/:imdb', function (req, res) {
    id = "2340001223312110";
    rating.deleteRating(req.params.imdb,id,function (err, newRating) {
        if (err) {
            res.send(err, 404);
        }
        else {
            res.json(newRating);
        }
    })
});