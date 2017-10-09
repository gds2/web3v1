var mongoose = require('mongoose');
var ratingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
var movieSchema = new mongoose.Schema({
    imdb: {
        type: String,
        required: true
    },
    titel: {
        type: String,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    lengte: {
        type: String,
        required: true
    },
    regisseur: {
        type: String,
        required: true
    },
    beschrijving: {
        type: String,
        required: true
    },
    ratings: [ratingSchema]


});

var moviesTool = module.exports = mongoose.model('movies', movieSchema);
module.exports.getMovies = function (callback, limit) {
    movie.find(callback).limit(limit);
}

module.exports.createMovies = function (movie, callback) {
    try {
        moviesTool.create(movie, callback);
    }
    catch (err) {
        if (err.message === "ValidatorError") {

        }
        else {

        }
    }

}

controlRating = function(userid,rating) {
    if(userid === undefined || rating === undefined){
        throw err;
    }
}


module.exports.createRating = function (movieid,rating, callback) {
    moviesTool.findOneAndUpdate({"imdb": movieid}, {$push: {"ratings": rating}},callback)
}

