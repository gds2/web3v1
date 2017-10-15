/**
 * All the routes for the ratings
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
rater = require('../models/ratings.js');
module.exports = router;


/**
 * Create a rating
 */
router.post("/", function (req, res) {
    token = req.headers['authorization'];
    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(err,401).json({error:"Invalid token"});
        }else {
            rater.createRating (req,decoded._id, function (err) {
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
            });
        }
    });

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
    token = req.headers['authorization'];

    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(err,401).json({error:"Invalid token"});
        }else {
            rater.getAverageRatings(req,function (err, newRating) {
                if (err) {
                    res.send(err,404);
                }
                else {
                    res.json(newRating);
                }
            })
        }
    });
}
/**
 * Get movies with their average rating with paging
 */
router.get('/average/page/:page', function (req, res) {
    getAverage(req,res);
});

/**
 * Delete the rating for the given movie if the current user rated it before
 */
router.delete('/:imdb', function (req, res) {
    token = req.headers['authorization'];
    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(err,401).json({error:"Invalid token"});
        }else {
            rater.deleteRating(req,decoded._id,function (err, newRating) {
                if (err) {
                    res.send(err, 404);
                }
                else {
                    res.json(newRating);
                }
            });
        }
    });
});



/**
 * Get the rating for the given movie if the current user rated it before
 */
router.get('/:imdb', function (req, res) {
    token = req.headers['authorization'];
    jwt.verify(token, req.app.get('private-key'), function (err,decoded) {
        if(err){
            res.send(err,401).json({error:"Invalid token"});
        }else {
            rater.getRating(req,decoded._id,function (err, newRating) {
                if (err) {
                    res.send(err, 404);
                }
                else {
                    res.json(newRating);
                }
            });
        }
    });
});

