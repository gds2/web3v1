/**
 *The model for the ratings
 */
var mongoose = require('mongoose');
movie = require('../models/movies.js');
var ratingSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    imdb:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        exclusiveMaximum: 5,
        exclusiveMinimum: 0.5,
        maximum: 5,
        minimum: 0,
        required: true
    }
});

/**
 * Exporting the ratingModel
 */
var ratingModel = module.exports = mongoose.model('ratings', ratingSchema);


/**
 * Create a new rating using the usersid, the amount of rating and the movie id(imdb)
 * @param req
 * @param userId
 * @param callback
 */
module.exports.createRating = function (req,userId,callback) {
    var userid = userId;
    var ratingAmount = req.body.rating;
    var imdb = req.body.imdb;
    //Check if the inputs are correct
    if (typeof userid !== 'undefined' && typeof ratingAmount !== 'undefined' && typeof ratingAmount === "number") {
        if (ratingAmount <= 5 && ratingAmount >= 0.5) {
            //Make sure the movie exits
            movie.findMovieByImdb(imdb,function (err, movie) {
                //Create or update the rating if the movie exists
                if(movie){
                    ratingModel.update( { userid: userid,  imdb : imdb}, {rating : ratingAmount }, { upsert : true }, callback );
                }
                //Movie not found
                else{
                    callback("Movie not found");
                }

            })

        }
        //Bad rating
        else{
            callback("Rating is not higher than 0.5 or lower than 5.1");
        }
    }
    //Not everything is defined right
    else{
        callback("userid needs to be defined, imdb needs to be defined and rating needs to be a number");
    }
};



//has to go later
module.exports.getRatings = function (id,imdb,callback) {
    ratingModel.find({userid: id,imdb: imdb}, function (err,doc) {
        if(doc.length){
            callback(err,doc);
        }
        else{
            callback(404);
        }

    });
};

/**
 * The the average rating of a movie, this function can used with paging or without it
 * @param req
 * @param callback
 */
module.exports.getAverageRatings = function (req,callback) {
    //Paging
    var page = parseInt(req.params.page);
    var pageEnd = page * 10;
    var pageStart = pageEnd - 10;

    //If paging requested
    if(!isNaN(page)) {
        ratingModel.aggregate(
            {"$lookup": {"from": "movies", "localField": "imdb", "foreignField": "imdb", "as": "movie"}},
            {"$unwind": "$movie"},
            {
                "$group": {
                    "_id": "$_id",
                    "movie": {"$push": "$movie"},
                    "average_rating": {"$avg": "$rating"}
                }
            },
            {"$limit": pageEnd},
            {"$skip": pageStart}
            , function (err, doc) {
                if (doc.length) {
                    callback(err, doc);
                }
                else {
                    callback("Nothing to show");
                }
            });
    }
    //No paging requested
    else{
        ratingModel.aggregate(
            {"$lookup": {"from": "movies", "localField": "imdb", "foreignField": "imdb", "as": "movie"}},
            {"$unwind": "$movie"},
            {
                "$group": {
                    "_id": "$_id",
                    "movie": {"$push": "$movie"},
                    "average_rating": {"$avg": "$rating"}
                }
            }, function (err, doc) {
                if (doc.length) {
                    callback(err, doc);
                }
                else {
                    callback("Nothing to show");
                }
            });
    }
};

/**
 * This function will delete a rating by a user using the movie's imdb and the user's id
 * @param req
 * @param id
 * @param callback
 */
module.exports.deleteRating = function (req,id,callback) {
 var imdb = req.params.imdb;
    ratingModel.find({imdb: imdb, userid : id}, function (err,doc) {
        if(doc.length) {
            ratingModel.remove({imdb: imdb, userid: id}, callback);
        }
        else{
            callback("Rating not found");
        }
    })
};


/**
 * This function will get a rating by a user using the movie's imdb and the user's id
 * @param req
 * @param id
 * @param callback
 */
module.exports.getRating = function (req,id,callback) {
    var imdb = req.params.imdb;
    ratingModel.find({imdb: imdb, userid : id}, function (err,doc) {
        if (doc.length) {
            callback(err, doc);
        }
        else {
            callback("Rating not found");
        }

    })
};


module.exports.getSingleMovieRating = function (req,callback) {
    var imdb = req.params.imdb;
    ratingModel.find({imdb: imdb}, function (err,doc) {
        if (doc.length) {
            callback(err, doc);
        }
        else {
            callback("Rating not found");
        }

    })
};