var mongoose = require('mongoose');
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
    }
});

var moviesModel = module.exports = mongoose.model('movies', movieSchema);



module.exports.getMovies = function (req, callback) {
    var page = parseInt(req.params.page);
    var query = req.query;
    var pageEnd = page * 10;
    var pageStart = pageEnd - 10;
    //Get the movies. Password is zero for if a hacker tries to be smart
    movie.find(query, {"password": 0}, {skip: pageStart, limit: pageEnd}, function (err, doc) {
        if (doc.length) {
            callback(err, doc);
        }
        else {
            callback("Nothing to show");
        }
    });
}
//has to go
module.exports.createMovies = function (movie, callback) {
    try {
        moviesModel.create(movie, callback);
    }
    catch (err) {
        if (err.message === "ValidatorError") {

        }
    }

}

