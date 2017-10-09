var mongoose = require('mongoose');
var integer = 0.0;
var ratingSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    movieId:{
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


module.exports.createRating = function (rating,callback) {
    try {
        rating
        ratingTool.create(rating, callback);
    }
    catch (err){
        if(err.message === "ValidatorError"){

        }
        else{

        }
    }

}

function controlRating(userid,rating) {
    if(userid === undefined || rating === undefined){
        throw err;
    }
}

module.exports.getRatings = function (callback, limit) {
    ratingTool.find(callback).limit(limit);
}

