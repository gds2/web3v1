var mongoose = require('mongoose');
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




module.exports.createRating = function (imdb, userid, ratingAmount,callback) {
    if (typeof userid != 'undefined' && typeof ratingAmount != 'undefined' && typeof ratingAmount === "number") {
        if (ratingAmount <= 5 && ratingAmount >= 0.5) {
            ratingModel.update( { userid: userid,  imdb : imdb}, {rating : ratingAmount }, { upsert : true }, callback );
        }
        else{
            callback(400);
        }
    }
    else{
        callback(400);
    }
}


module.exports.getAllRatings = function (callback, limit) {
    ratingModel.find(callback).limit(limit);
}

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

module.exports.getAverageRatings = function (callback) {
    ratingModel.aggregate(
        {"$lookup" : {"from": "movies", "localField": "imdb", "foreignField" : "imdb", "as" : "movie" }},
        {"$unwind": "$movie"},
        { "$group": {
            "_id": "$_id",
            "movie" : {"$push": "$movie"},
            "average rating": { "$avg": "$rating" }
        }}
        , function (err,doc) {
            if(doc.length){
                callback(err,doc);
            }
        });
}

module.exports.deleteRating = function (imdb,id,callback) {
    ratingModel.remove({imdb: imdb, userid : id  }, callback);
}

