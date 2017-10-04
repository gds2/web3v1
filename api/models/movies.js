var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    imdb:{
        type: String,
        required: true
    },
    titel:{
        type: String,
        required: true
    },
    datum:{
        type: String,
        required: true
    },
    lengte:{
        type: String,
        required: true
    },
    regisseur:{
        type: String,
        required: true
    },
    beschrijving:{
        type: String,
        required: true
    }
});

var movie = module.exports = mongoose.model('movies', movieSchema);

module.exports.getMovies = function (callback, limit) {
    person.find(callback).limit(limit);
}

module.exports.createMovie = function (newMovie,callback) {
    try {
        movie.create(newMovie, callback);
    }
    catch (err){
        if(err.message === "ValidatorError"){

        }
        else{

        }
    }
}