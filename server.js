/**
 * Run this to start the server
 *
 */
//Express
var express = require('express');
var app = express();
//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notflix');
//Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Key for validation
app.set('private-key', 'takesian-deSwart');



// Routes
app.use('/auth', require('./api/routes/auth.js'));
app.use('/api/movies', require('./api/routes/movies.js'));
app.use('/api/ratings', require('./api/routes/ratings.js'));
app.use('/api/users', require('./api/routes/users.js'));

//Check if the api works
app.get('/', function (req,res) {
    res.send('working');
})
//Start on port 3000
app.listen(3000);
//Log that the server is running on port 3000
console.log('Api on 3000');
