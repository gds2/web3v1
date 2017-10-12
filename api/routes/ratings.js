// All the routes for the ratings
var express = require('express');
var router = express.Router();
rater = require('../models/ratings.js');
module.exports = router;


//Have to edit this a bit
router.post("/", function (req, res) {
    var userId = req.body.userid;
    var ratingAmount = req.body.rating;
    var imdb = req.body.imdb;
    rater.createRating (imdb, userId, ratingAmount, function (err, newRating) {
        if (err) {
            if(err === 404){
                res.sendStatus(404);
            }else {
                res.sendStatus(400);
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
 * Get movies with their average rating
 */
router.get('/average', function (req, res) {
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
router.delete('/:imdb', function (req, res) {
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