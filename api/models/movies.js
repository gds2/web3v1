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
    }

}

controlRating = function (userid, rating) {
    if (userid === undefined || rating === undefined) {
        throw err;
    }
}



module.exports.createRating = function (movieid, userId, ratingAmount, callback) {
    if (typeof userId != 'undefined' && typeof ratingAmount != 'undefined' && typeof ratingAmount === "number") {
        if (ratingAmount > 0.4 && ratingAmount < 5.1) {
            moviesTool.find({imdb: movieid, 'ratings.userId': userId
            }, function (err, doc) {
                if(doc.length){
                //update
                }
                else{
                    var newRating = {"userId": userId, "rating": ratingAmount};
                    moviesTool.findOneAndUpdate({"imdb": movieid}, {$push: {"ratings": newRating}}, callback)
                }
            } )
        }
        else {
            callback(400);
        }
    }
    else {
        callback(400);
    }
}


/*
module.exports.getMovieWithUserRating = function (movieid, userid) {
    person.find({username: user.username}, function (err, docs) {
        if (docs.length) {
                moviesTool.findOne({"ratings.userId": userid}, docs)
            }
    )
    }};
*/
module.exports.shit = function (movieid, userid, callback) {




   moviesTool.find({imdb: movieid,
       'ratings.userId': userid
    }, {'_id': 1,
        'titel' : 1,
        'imdb' : 1,
       'ratings.$': 1,
       'datum' : 1,
       'lengte' : 1,
       'regisseur': 1,
       'beschrijving' : 1
    },function (err, docs) {
       if (docs.length) {
           callback(err,docs)
       }
       else {
           moviesTool.find({imdb: movieid},callback).select("-ratings");{

           }
           callback("Current user has no rating");
       }});
    var b = moviesTool.find({imdb: movieid});
}

module.exports.getMovieWithUserRating = function (movieid,callback) {

    moviesTool.find({imdb: movieid},callback).select("-ratings");


}

