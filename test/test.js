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
person = require('../api/models/users.js');

//Good weather tests for api/users

describe("Users unittest", function () {
    it("Should return a json file", function (done) {
        server.get("api/persons").expect("Content-type", /json/).expect(200, done);
    });
});


describe("Post a full body to the users", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.post("api/persons").send({
            "name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22",
            "username": "koek"}).set('Accept', /application\/json/).expect('Content-type', /json/).expect(200,done);
    });
});

describe("Post a body without a prepostion to the users", function () {
    it("Should return a json file and a 200 code", function (done) {
        server.post("api/persons").send({
            "name": "test",
            "lastname": "tester",
            "password": "test22",
            "username": "koek"}).set('Accept', /application\/json/).expect('Content-type', /json/).expect(200,done);
    });
});


 //Bad weather tests for  /api/persons/

describe("Post an empty body to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/persons").send({}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body without a password to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/persons").send({"name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "username": "koek"}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body without an username to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/persons").send({
            "name": "test",
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22"
            }).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body without a name to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/persons").send({
            "lastname": "tester",
            "preposition" : "de",
            "password": "test22",
            "username": "koek"}).set('Accept', /application\/json/).expect(400,done);
    });
});

describe("Post a body without a last name to the users", function () {
    it("Should return a 400 code", function (done) {
        server.post("api/persons").send({"name": "test",
            "preposition" : "de",
            "password": "test22",
            "username": "koek"}).set('Accept', /application\/json/).expect(400,done);
    });
});



/**
 * Good weather tests for api/movies
 */
describe("Try getting the movies", function () {
    it("Should return a json file", function (done) {
        server.get("api/movies").expect("Content-type", /json/).expect(200, done);
    });
});






