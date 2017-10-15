request = require("request");
var express = require('express');
var supertest = require('supertest');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var server = supertest.agent("http://localhost:3000/");
user = require('../api/models/users.js');


/**
 * Created zo all the tests use the same token
 */
describe("Start all the tests", function () {

    //Make sure this user exists
    var token = null;
    before(function (done) {
        request.post(
            'http://localhost:3000/auth',
            {
                json: {
                    "username": "testuser",
                    "password": "test22"
                }
            },
            function (error, response, body) {
                token = body.token;
                done()
            }
        );
    });

    /**
     * Good weather tests for api/users
     */

    //Make sure the user doesnt already exist
    describe("Test#1 Post a full body to the users", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.post("api/users").send({
                "name": "test",
                "lastname": "tester",
                "preposition": "de",
                "password": "test22",
                "username": "testuser"
            }).expect(200, done);
        });
    });
    //Make sure the user doesnt exist
    describe("Test#2 Post a body without a prepostion to the users", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.post("api/users").send({
                "name": "test",
                "lastname": "tester",
                "password": "test22",
                "username": "testuser2"
            }).expect(200, done);
        });
    });


    describe("Test#3 Get all of the users without sending parameters", function () {
        it("Should return a json file", function (done) {
            server.get("api/users").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });


    describe("Test#4 Get users while giving parameters", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/users?username=testuser").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });

    describe("Test#5 Get users by using paging", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/users/page/1").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });


    /**
     * Bad weather tests for  /api/users
     */


    describe("Test#5 Post users without an username that already exists", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").set('Authorization', token).send({
                "name": "test",
                "lastname": "tester",
                "preposition": "de",
                "password": "test22",
                "username": "testuser"
            }).expect(400, done);
        });
    });


    describe("Test#6 Get all of the users without a token", function () {
        it("Should return a 401 code", function (done) {
            server.get("api/users").expect(401, done);
        });
    });

    describe("Test#7 Get users while giving parameters of a user that doesnt exist", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/users?username=bladhjsgdghjdfjdsbgfjdsfjdhs").set('Authorization', token).expect(404, done);
        });
    });

    describe("Test#7 Post an empty body to the users", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").send({}).set('Accept', /application\/json/).set('Authorization', token).expect(400, done);
        });
    });

    describe("Test#8 Post a wrong type of body to the users", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").send(",,,,,,,,,,,}").set('Authorization', token).expect(400, done);
        });
    });

    describe("Test#9 Get users by using a letter instead of a number by paging", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/users/page/a").expect("Content-type", /json/).set('Authorization', token).expect(200, done);
        });
    });

    describe("Test#10 Try getting users from a page that doesnt have any users", function () {
        it("Should return a 404 code", function (done) {
            server.get("api/users/page/1000000").set('Authorization', token).expect(404, done);
        });
    });


    describe("Test#11 Post a body without a password to the users", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").send({
                "name": "test",
                "lastname": "tester",
                "preposition": "de",
                "username": "koek2"
            }).set('Accept', /application\/json/).expect(400, done);
        });
    });

    describe("Test#12 Post a body without an username to the users", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").send({
                "name": "test",
                "lastname": "tester",
                "preposition": "de",
                "password": "test22"
            }).set('Accept', /application\/json/).expect(400, done);
        });
    });


    describe("Test#13 Post a body without a first name to the users", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").send({
                "lastname": "tester",
                "preposition": "de",
                "password": "test22",
                "username": "koek3"
            }).set('Accept', /application\/json/).expect(400, done);
        });
    });

    describe("Test#14 Post a body without a last name to the users", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/users").send({
                "name": "test",
                "preposition": "de",
                "password": "test22",
                "username": "koek4"
            }).set('Accept', /application\/json/).expect(400, done);
        });
    });

    /**
     * Good weather tests for api/ratings
     */

    describe("Test#15 Post a full body to the ratings/update rating", function () {
        it("Should return a 200 code", function (done) {
            server.post("api/ratings").send({
                "rating": 5,
                "imdb": "123"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(200, done);
        });
    });

    describe("Test#16 Get a rating  for a movie the user rated before", function () {
        it("Should return a 200 code", function (done) {
            server.get("api/ratings/123").set('Accept', /application\/json/).set('Authorization', token).expect(200, done);
        });
    });


    describe("Test#17 get a list of average ratings", function () {
        it("Should return a 200 code", function (done) {
            server.get("api/ratings/average").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });

    describe("Test#18 get a list of average ratings by using paging", function () {
        it("Should return a 200 code", function (done) {
            server.get("api/ratings/average/page/1").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });

    describe("Test#19 Delete a rating", function () {
        it("Should return a 200 code", function (done) {
            server.delete("api/ratings/123").set('Authorization', token).expect(200, done);
        });
    });


    /**
     * Bad weather tests for api/ratings
     */
    describe("Test#20 Post a full body to the ratings without a token", function () {
        it("Should return a 401 code", function (done) {
            server.post("api/ratings").send({
                "rating": 5,
                "imdb": "126"
            }).set('Accept', /application\/json/).expect(401, done);
        });
    });

    describe("Test#21 Get a rating  for a movie the user hasnt rated before", function () {
        it("Should return a 200 code", function (done) {
            server.get("api/ratings/123030030454050405").set('Accept', /application\/json/).set('Authorization', token).expect(404, done);
        });
    });

    describe("Test#22 Post a rating to a movie that doesnt exist", function () {
        it("Should return a 404 code", function (done) {
            server.post("api/ratings").send({
                "rating": 5,
                "imdb": "12300003400430430434343"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(404, done);
        });
    });

    describe("Test#23 Post a rating that doesnt have an imdb", function () {
        it("Should return a 404 code", function (done) {
            server.post("api/ratings").send({
                "rating": 5
            }).set('Accept', /application\/json/).set('Authorization', token).expect(404, done);
        });
    });

    describe("Test#24 Post a rating that doesnt have a rating amount", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/ratings").send({
                "imdb": "123"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(400, done);
        });
    });

    describe("Test#25 Post a wrong json format to the ratings", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/ratings").set('Authorization', token).send(",,,,fds,fsf,sfsjkl;:::").set('Accept', /application\/json/).expect(400, done);
        });
    });

    describe("Test#26 Post an empty json  to the ratings", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/ratings").set('Authorization', token).send({}).set('Accept', /application\/json/).expect(400, done);
        });
    });

    describe("Test#27 get a list of average ratings without a token", function () {
        it("Should return a 401 code", function (done) {
            server.get("api/ratings/average").expect(401, done);
        });
    });

    describe("Test#28 try getting a list of average ratings by using a page that doenst exist", function () {
        it("Should return a 404 code", function (done) {
            server.get("api/ratings/average/page/120000").set('Authorization', token).expect(404, done);
        });
    });


    describe("Test#29 try getting a list of average ratings by using a letter instead of a number at paging", function () {
        it("Should return a 200 code", function (done) {
            server.get("api/ratings/average/page/sdadadada").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });

    describe("Test#30 Delete a rating without a token", function () {
        it("Should return a 401 code", function (done) {
            server.delete("api/ratings/123").expect(401, done);
        });
    });

    describe("Test#31 Delete a rating that doesnt exist", function () {
        it("Should return a 404 code", function (done) {
            server.delete("api/ratings/123").set('Authorization', token).expect(404, done);
        });
    });


    describe("Test#32 Post a rating with the rating amount not being a number ", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/ratings").send({
                "rating": "5",
                "imdb": "123"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(400, done);
        });
    });


    describe("Test#33 Post a rating with the rating amount being lower than 0.5 ", function () {
        it("Should return a 400 code", function (done) {
            server.post("api/ratings").send({
                "rating": 0.4,
                "imdb": "123"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(400, done);
        });
    });

    describe("Test#34 Post a rating with the rating amount being higher than 5 ", function () {
        it("Should return a 200 code", function (done) {
            server.post("api/ratings").send({
                "rating": 6,
                "imdb": "123"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(400, done);
        });
    });

    /**
     * Good weather tests for api/movies
     */
    describe("Test#35 Try getting the movies", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/movies").expect("Content-type", /json/).set('Authorization', token).expect(200, done);
        });
    });

    describe("Test#36 Try getting the movies by using paging", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/movies/page/1").expect("Content-type", /json/).set('Authorization', token).expect(200, done);
        });
    });

    describe("Test#37 Try getting the movies by using certain parameters in the url", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/movies?imdb=123").expect("Content-type", /json/).set('Authorization', token).expect(200, done);
        });
    });


    /**
     * Bad weather tests for api/movies
     */
    describe("Test#38 Try getting the movies without a token", function () {
        it("Should return a 401 error Invalid token", function (done) {
            server.get("api/movies").expect(401, done);
        });
    });

    describe("Test#39 Try getting the movies by using a page that doesnt have any data", function () {
        it("Should return a json file and a 404 code", function (done) {
            server.get("api/movies/page/2323233").set('Authorization', token).expect(404, done);
        });
    });

    describe("Test#40 Try getting the movies by using a letter as a  page number", function () {
        it("Should return a json file and a 200 code", function (done) {
            server.get("api/movies/page/a").set('Authorization', token).expect("Content-type", /json/).expect(200, done);
        });
    });

    describe("Test#41 Try getting a movie that doest have the parameters in the url", function () {
        it("Should return a json file and a 404 code", function (done) {
            server.get("api/movies?imdb=12233343534535343").set('Authorization', token).expect(404, done);
        });
    });

    /**
     * Good weather tests for /auth
     */
    describe("Test#42 Post a body with username and password to try to login", function () {
        it("Should return a jasonwebtoken object containing an encrypted userId", function (done) {
            server.post("/auth").send({
                "username": "Username",
                "password": "123456"
            }).set('Accept', /application\/json/).set('Authorization', token).expect(201, done);
        })
    });

    /**
     * Bad weather tests for /auth
     */

    describe("Test#43 Post an empty body to /auth", function () {
        it("Should return an error code 400 empty username or password", function (done) {
            server.post("/auth").send({
                "username": "Username",
                "password": "123456"
            }).set('Accept', /application\/json/).expect(400, done);
        })
    });


    describe("Test#44 Post a body without a username", function () {
        it("Should return an error code 400 empty username or password", function (done) {
            server.post("/auth").send({
                "password": "123456"
            }).set('Accept', /application\/json/).expect(400, done);
        })
    });


    describe("Test#45 Post a body without a password", function () {
        it("Should return an error code 400 empty username or password", function (done) {
            server.post("/auth").send({
                "username": "username"
            }).set('Accept', /application\/json/).expect(400, done);
        })
    });

    describe("Test#46 Post a body without a username", function () {
        it("Should return an error code 40e username/password combination does not exist", function (done) {
            server.post("/auth").send({
                "username": "wrongUsername",
                "password": "correctPassword"
            }).set('Accept', /application\/json/).expect(400, done);
        })
    });


    describe("Test#47 Post a body with correct username but wrong password", function () {
        it("Should return an error code 403 username/password combination does not exist", function (done) {
            server.post("/auth").send({
                "username": "correctUsername",
                "password": "wrongPassword"
            }).set('Accept', /application\/json/).expect(403, done);
        })
    });
})


