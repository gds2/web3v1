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

var ratingModel = module.exports = mongoose.model('ratings', ratingSchema);


/**
 * Create a new rating
 * @param imdb
 * @param userid
 * @param ratingAmount
 * @param callback
 */
module.exports.createRating = function (req,callback) {
    var userid = req.body.userid;
    var ratingAmount = req.body.rating;
    var imdb = req.body.imdb;
    //Check if the inputs are correct
    if (typeof userid != 'undefined' && typeof ratingAmount != 'undefined' && typeof ratingAmount === "number") {
        if (ratingAmount <= 5 && ratingAmount >= 0.5) {
            movie.getMovies(imdb,function (err, movie) {
                if(movie){
                    ratingModel.update( { userid: userid,  imdb : imdb}, {rating : ratingAmount }, { upsert : true }, callback );
                }
                else{
                    callback("Movie not found");
                }

            })

        }
        else{
            callback("Rating is not higher than 0.5 or lower than 5.1");
        }
    }
    else{
        callback("userid needs to be defined, imdb needs to be defined and rating needs to be a number");
    }
}


module.exports.getAllRatings = function (callback, limit) {
    ratingModel.find(callback).limit(limit);
}
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
}

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
                    "average rating": {"$avg": "$rating"}
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
                    "average rating": {"$avg": "$rating"}
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
}

/**
 * Needs to be tested
 * @param imdb
 * @param id
 * @param callback
 */
module.exports.deleteRating = function (imdb,id,callback) {
    ratingModel.findone({imdb: imdb, userid : id}, function (err,doc) {
        if(doc.length) {
            ratingModel.remove({imdb: imdb, userid: id}, callback);
        }
        else{
            callback("Rating not found");
        }

    })



}

