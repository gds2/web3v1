var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notflix');
var db = mongoose.connection;
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





// Routes
app.use('/api', require('./api/routes/api.js'));

app.get('/', function (req,res) {
    res.send('working');
})
app.listen(3000);
console.log('Api on 3000');


person = require('./api/models/users.js');
movie = require('./api/models/movies.js');
rating = require('./api/models/ratings.js');