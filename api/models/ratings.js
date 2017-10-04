var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema({
    userId:{
        type: int,
        required: true
    },
    movieId:{
        type: int,
        required: true
    },
    rating:{
        type: String,
        required: true
    }
});

var rating = module.exports = mongoose.model('ratings', ratingSchema);

module.exports.createRating = function (userId,movieId,callback) {
    try {
        rating.create(userId,movieId, callback);
    }
    catch (err){
        if(err.message === "ValidatorError"){

        }
        else{

        }
    }

}