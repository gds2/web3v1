/**
 *The model for the Movies
 */
var mongoose = require('mongoose');
var movieSchema = new mongoose.Schema({
    imdb: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img_url:{
        type: String,
        required: true
    }
});
/**
 * Exporting the moviesModel
 */
var moviesModel = module.exports = mongoose.model('movies', movieSchema);


/**
 * Get all of the movies in the database, this function can be used with paging ot without it
 * @param req
 * @param callback
 */
module.exports.getMovies = function (req, callback) {
    var page = parseInt(req.params.page);
    var query = req.query;
    var pageEnd = page * 10;
    var pageStart = pageEnd - 10;
    //Get the movies. Password is zero for if a hacker tries to be smart
    movie.find(query, {"password": 0}, {skip: pageStart, limit: pageEnd}, function (err, doc) {
        if(typeof doc !== 'undefined') {
            if (doc.length) {
                callback(err, doc);
            }
            else {
                callback("Nothing to show");
            }
        }
        else{
            callback(400)
        }
    });
};
/**
 * Find a movie by imdb. This is only to be used by the server and not the API
 * @param imdb
 * @param callback
 */
module.exports.findMovieByImdb = function (imdb, callback) {
    //Get the movies. Password is zero for if a hacker tries to be smart
    movie.find({"imdb" : imdb}, {"password": 0}, function (err, doc) {
        if(typeof doc !== 'undefined') {
            if (doc.length) {
                callback(err, doc);
            }
            else {
                callback("Nothing to show");
            }
        }
        else{
            callback(400)
        }
    });
};

module.exports.createMovie = function (req, callback) {
    moviesModel.create(req.body, callback);
};