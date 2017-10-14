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

describe("Post a full body to the ratings", function () {
    it("Should return a 200 code", function (done) {
        server.post("api/ratings").send({
            "userid":"2343",
                "rating": 5,
            "imdb" : "123"
        }).set('Accept', /application\/json/).expect(200,done);
    });
});



/**
 * Good weather tests for api/movies
 */
describe("Try getting the movies with a token", function () {
    it("Should return a json file", function (done) {
        server.get("api/movies").expect("Content-type", /json/).expect(200, done);
    });
});

/**
 * Bad weather tests for api/movies
 */
describe("Try getting the movies without a token", function () {
    it("Should return a 401 error Invalid token", function (done) {
        server.get("api/movies").expect("Content-type", /json/).expect(401, done);
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
    it("Should return a jasonwebtoken object containing an encrypted userId"),function (done) {
        server.post("/auth").send({
            "username" : "Username",
            "password" : "123456"
        }).set('Accept',/application\/json/).expect(201,done);
    }
})

/**
 * Bad weather tests for /auth
 */

describe("Post an empty body to /auth",function () {
    it("Should return an error code 400 empty username or password"),function (done) {
        server.post("/auth").send({
            "username" : "Username",
            "password" : "123456"
        }).set('Accept',/application\/json/).expect(400,done);
    }
})


describe("Post a body without a username",function () {
    it("Should return an error code 400 empty username or password"),function (done) {
        server.post("/auth").send({
            "password" : "123456"
        }).set('Accept',/application\/json/).expect(400,done);
    }
})


describe("Post a body without a password",function () {
    it("Should return an error code 400 empty username or password"),function (done) {
        server.post("/auth").send({
            "username" : "username"
        }).set('Accept',/application\/json/).expect(400,done);
    }
})

describe("Post a body without a username",function () {
    it("Should return an error code 40e username/password combination does not exist"),function (done) {
        server.post("/auth").send({
            "username" : "wrongUsername",
            "password" : "correctPassword"
        }).set('Accept',/application\/json/).expect(400,done);
    }
})


describe("Post a body with correct username but wrong password",function () {
    it("Should return an error code 403 username/password combination does not exist"),function (done) {
        server.post("/auth").send({
            "username" : "correctUsername",
            "password" : "wrongPassword"
        }).set('Accept',/application\/json/).expect(403,done);
    }
})


