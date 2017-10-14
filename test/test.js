//var should = require("should");
// request = require("request");
//var expect = require("chai").expect;
//var util = require("utill");
var express = require('express');
var supertest = require('supertest');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var server = supertest.agent("http://localhost:3000/");
user = require('../api/models/users.js');

/**
 * Good weather tests for api/users
 */

describe("Post a full body to the users", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.post("api/users").send({
            "name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22",
            "username": "testuser"}).expect(200,done);
    });
});

describe("Post a body without a prepostion to the users", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.post("api/users").send({
            "name": "test",
            "lastname": "tester",
            "password": "test22",
            "username": "testuser2"}).set.expect(200,done);
    });
});


describe("Get all of the users without sending parameters", function () {
    it("Should return a json file", function (done) {
        server.get("api/users").expect("Content-type", /json/).expect(200, done);
    });
});

describe("Get users while giving parameters", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/users?username=testuser").expect("Content-type", /json/).expect(200, done);
    });
});

describe("Get users by using paging", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/users/page/1").expect("Content-type", /json/).expect(200, done);
    });
});


/**
 * Bad weather tests for  /api/users
 */


describe("Post  users without an username that already exists", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send({
            "name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22",
            "username": "testuser"}).expect(400,done);
    });
});


describe("Get all of the users without a token", function () {
    it("Should return a 401 code", function (done) {
        server.get("api/users").expect(401, done);
    });
});

describe("Get users while giving parameters of a user that doesnt exist", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/users?username=bladhjsgdghjdfjdsbgfjdsfjdhs").expect(404, done);
    });
});

describe("Post an empty body to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send({}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a wrong type of body to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send(",,,,,,,,,,,}").expect(400,done);
    });
});

describe("Get users by using a letter instead of a number by paging", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/users/page/a").expect("Content-type", /json/).expect(200, done);
    });
});

describe("Try getting users from a page that doesnt have any users", function () {
    it("Should return a 404 code", function (done) {
        server.get("api/users/page/1000000").expect(404, done);
    });
});


describe("Post a body without a password to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send({"name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "username": "koek"}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body without an username to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send({
            "name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22"
            }).set('Accept', /application\/json/).expect(400,done);
    });
});


describe("Post a body without a name to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send({
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22",
            "username": "koek"}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body without a last name to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/users").send({"name": "test",
            "preposition" : "de",
            "password": "test22",
            "username": "koek"}).set('Accept', /application\/json/).expect(400,done);
    });
});

/**
 * Good weather tests for api/ratings
 */

describe("Post a full body to the ratings/update rating", function () {
    it("Should return a 200 code", function (done) {
        server.post("api/ratings").send({
            "userid":"2343",
                "rating": 5,
            "imdb" : "123"
        }).set('Accept', /application\/json/).expect(200,done);
    });
});


describe("get a list of average ratings", function () {
    it("Should return a 200 code", function (done) {
        server.get("api/ratings/average").expect(expect("Content-type", /json/).expect(200,done));
    });
});

describe("get a list of average ratings by using paging", function () {
    it("Should return a 200 code", function (done) {
        server.get("api/ratings/average/page/1").expect(expect("Content-type", /json/).expect(200,done));
    });
});

describe("Delete a rating", function () {
    it("Should return a 200 code", function (done) {
        server.delete("api/ratings/123").expect(200,done);
    });
});


/**
 * Bad weather tests for api/ratings
 */


describe("Post a full body to the ratings without a token", function () {
    it("Should return a 401 code", function (done) {
        server.post("api/ratings").send({
            "rating": 5,
            "imdb" : "123"
        }).set('Accept', /application\/json/).expect(401,done);
    });
});


describe("Post a rating to a movie that doesnt exist", function () {
    it("Should return a 404 code", function (done) {
        server.post("api/ratings").send({
            "rating": 5,
            "imdb" : "12300003400430430434343"
        }).set('Accept', /application\/json/).expect(404,done);
    });
});

describe("Post a rating that doesnt have an imdb", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/ratings").send({
            "rating": 5
        }).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a rating that doesnt have a rating amount", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/ratings").send({
            "imdb": "123"
        }).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a wrong json format to the ratings", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/ratings").send(",,,,fds,fsf,sfsjkl;:::").set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post an empty json  to the ratings", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/ratings").send({}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("get a list of average ratings without a token", function () {
    it("Should return a 401 code", function (done) {
        server.get("api/ratings/average").expect(401,done);
    });
});

describe("try getting a list of average ratings by using a page that doenst exist", function () {
    it("Should return a 404 code", function (done) {
        server.get("api/ratings/average/page/120000").expect(404,done);
    });
});


describe("try getting a list of average ratings by using a letter instead of a number at paging", function () {
    it("Should return a 200 code", function (done) {
        server.get("api/ratings/average/page/120000").expect("Content-type", /json/).expect(200,done);
    });
});

describe("Delete a rating without a token", function () {
    it("Should return a 401 code", function (done) {
        server.delete("api/ratings/123").expect(401,done);
    });
});

describe("Delete a rating that doesnt exist", function () {
    it("Should return a 404 code", function (done) {
        server.delete("api/ratings/123").expect(404,done);
    });
});


describe("Post a rating with the rating amount not being a number ", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/ratings").send({
            "userid":"2343",
            "rating": "5",
            "imdb" : "123"
        }).set('Accept', /application\/json/).expect(400,done);
    });
});


describe("Post a rating with the rating amount being lower than 0.5 ", function () {
    it("Should return a 200 code", function (done) {
        server.post("api/ratings").send({
            "userid":"2343",
            "rating": 0.4,
            "imdb" : "123"
        }).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a rating with the rating amount being higher than 5 ", function () {
    it("Should return a 200 code", function (done) {
        server.post("api/ratings").send({
            "userid":"2343",
            "rating": 6,
            "imdb" : "123"
        }).set('Accept', /application\/json/).expect(400,done);
    });
});

/**
 * Good weather tests for api/movies
 */
describe("Try getting the movies", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/movies").expect("Content-type", /json/).expect(200, done);
    });
});

describe("Try getting the movies by using paging", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/movies/page1").expect("Content-type", /json/).expect(200, done);
    });
});

describe("Try getting the movies by using certain parameters in the url", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/movies?imdb=123").expect("Content-type", /json/).expect(200, done);
    });
});



/**
 * Bad weather tests for api/movies
 */
describe("Try getting the movies without a token", function () {
    it("Should return a 401 error Invalid token", function (done) {
        server.get("api/movies").expect(401, done);
    });
});

describe("Try getting the movies by using a page that doesnt have any data", function () {
    it("Should return a json file and a 404 code", function (done) {
        server.get("api/movies/page/2323233").expect(404, done);
    });
});

describe("Try getting the movies by using a letter as a  page number", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.get("api/movies/page/a").expect("Content-type", /json/).expect(200, done);
    });
});

describe("Try getting a movie that doest have the parameters in the url", function () {
    it("Should return a json file and a 404 code", function (done) {
        server.get("api/movies?imdb=12233343534535343").expect(404, done);
    });
});

/**
 * Good weather tests for api/ratings
 */
describe("Post a full body to the ratings", function () {
    it("Should return a json body", function (done) {
        server.post("api/ratings").send({
            "userid": "tester",
            "ratingAmount" : "5",
            "imdb": "123"}).set('Accept', /application\/json/).expect(200,done);
    });
});

describe("Delete a rating using the userid and the imdb", function () {
    it("Should return an OK response", function (done) {
        server.delete("api/ratings").send({
            "userid": "tester",
            "imdb": "123"}).set('Accept', /application\/json/).expect(200,done);
    });
});
/**
 * Bad weather tests for api/ratings
 */
describe("Post an empty body to the ratings", function () {
    it("Should return an error 400 saying that not all variables are defined", function (done) {
        server.post("api/ratings").send({}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body to the ratings with a rating higher than 5", function () {
    it("Should return an error 400 Rating is not higher than 0.5 or lower than 5.1", function (done) {
        server.post("api/ratings").send({
            "userid" : "tester",
            "ratingAmount" : "6",
            "imdb" : "123"}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Delete a rating by posting a userId but not an imdb id", function () {
    it("Should return an 404 not found error", function (done) {
        server.delete("api/ratings").send({
            "userid": "tester"}).set('Accept', /application\/json/).expect(404,done);
    });
});
/**
 * Good weather tests for /auth
 */
describe("Post a body with username and password to try to login",function () {
    it("Should return a jasonwebtoken object containing an encrypted userId",function (done) {
        server.post("/auth").send({
            "username" : "Username",
            "password" : "123456"
        }).set('Accept',/application\/json/).expect(201,done);
    })
});

/**
 * Bad weather tests for /auth
 */

describe("Post an empty body to /auth",function () {
    it("Should return an error code 400 empty username or password",function (done) {
        server.post("/auth").send({
            "username" : "Username",
            "password" : "123456"
        }).set('Accept',/application\/json/).expect(400,done);
    })
});


describe("Post a body without a username",function () {
    it("Should return an error code 400 empty username or password" ,function (done) {
        server.post("/auth").send({
            "password" : "123456"
        }).set('Accept',/application\/json/).expect(400,done);
    })
});


describe("Post a body without a password",function () {
    it("Should return an error code 400 empty username or password",function (done) {
        server.post("/auth").send({
            "username" : "username"
        }).set('Accept',/application\/json/).expect(400,done);
    })
});

describe("Post a body without a username",function () {
    it("Should return an error code 40e username/password combination does not exist",function (done) {
        server.post("/auth").send({
            "username" : "wrongUsername",
            "password" : "correctPassword"
        }).set('Accept',/application\/json/).expect(400,done);
    })
});


describe("Post a body with correct username but wrong password",function () {
    it("Should return an error code 403 username/password combination does not exist",function (done) {
        server.post("/auth").send({
            "username" : "correctUsername",
            "password" : "wrongPassword"
        }).set('Accept',/application\/json/).expect(403,done);
    })
});


