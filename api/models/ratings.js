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

var ratingTool = module.exports = mongoose.model('ratings', ratingSchema);

module.exports.createRating = function (rating,callback) {
    try {
        ratingTool.create(rating, callback);
    }
    catch (err){
        if(err.message === "ValidatorError"){

        }
        else{

        }
    }

}

module.exports.getRatings = function (callback, limit) {
    ratingTool.find(callback).limit(limit);
}

