const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

var assert = require('assert');

describe("Main routes", () => {
    describe("/ping request", () => {
        it("returns pong", (done) => {
            chai.request('localhost:8040')
            .get('/ping')
            .end((err, res) => {
                assert.equal(res.text, "Pong!");
                done();
            });
        });
    });
    describe("/version request", () => {
        it("returns version", (done) => {
            chai.request('localhost:8040')
            .get('/version')
            .end((err, res) => {
                assert(res.text.startsWith("Node version is: v"));
                done();
            });
        });
    });
});
describe("Image routes", () => {
    describe("/images request", () => {
        it("returns array of images", (done) => {
            chai.request('localhost:8040')
            .get('/images')
            .end((err, res) => {
                chai.assert.isArray(res.body);
                assert(res.body.length > 1);
                done();
            });
        });
    });
    describe("/images/:size/:offset request", () => {
        it("returns array of :size images", (done) => {
            chai.request('localhost:8040')
            .get('/images/5/5')
            .end((err, res) => {
                chai.assert.isArray(res.body);
                assert(res.body.length == 5);
                done();
            });
        });
    });
});
describe("User routes", () => {
    describe("/Nicolas request", () => {
        it("returns user and posts by Nicolas", (done) => {
            chai.request('localhost:8040')
            .get('/Nicolas')
            .end((err, res) => {
                chai.assert.isObject(res.body.user);
                //assert(res.body.user.length > 1);
                assert(res.body.posts.length > 1);
                done();
            });
        });
    });
    describe("/Romaguera request", () => {
        it("returns posts by Romaguera group", (done) => {
            chai.request('localhost:8040')
            .get('/Romaguera')
            .end((err, res) => {
                assert(res.body.posts.length > 1);
                done();
            });
        });
    });
});
describe("Todo routes", () => {
    describe("/todo request", () => {
        it("sends todo to Typicode and returns id", (done) => {
            chai.request('localhost:8040')
            .post('/todo')
            .send('{"userId":1,"title":"Vimond test case","completed":false}')
            .end((err, res) => {
                assert(res.body.id == 201);
                done();
            });
        });
    });
    describe("/new-todos request", () => {
        it("returns list of todo's in memory", (done) => {
            chai.request('localhost:8040')
            .post('/todo')
            .send('{"userId":1,"title":"Vimond test case","completed":false}')
            .then(() => {
                chai.request('localhost:8040')
                .get('/new-todos')
                .end((err, res) => {
                    assert(res.body.length >= 1);
                    done();
                });
            });
        });
    });
});
