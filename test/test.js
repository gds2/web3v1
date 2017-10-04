//var should = require("should");
// request = require("request");
//var expect = require("chai").expect;
//var util = require("utill");
var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000/");

describe("Users unittest", function () {
it("Should return a json file", function (done) {
    server.get("api/persons").expect("Content-type", /json/).expect(200,done);
});
});

