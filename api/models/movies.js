var mongoose = require('mongoose');
var ratingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        exclusiveMaximum: 5,
        exclusiveMinimum: 0.5,
        maximum: 5,
        minimum: 0,
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
    ratings: {
        ratings: [ratingSchema],
        required: false
    }

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


module.exports.createRating = function (rating,movieid, callback) {
    try {
        moviesTool.findOneAndUpdate({imdb: movieid}, {$push: {ratings: rating}},callback)
    }
    catch (err) {
        if (err.message === "ValidatorError") {

        }
        else {

        }
    }

}