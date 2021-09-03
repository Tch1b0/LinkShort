const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../dist/index");

chai.should();
chai.use(chaiHttp);

// example_short and token are there for the DELETE and PUT tests
var example_short;
var example_token;

describe("LinkShort API", () => {
    describe("POST /create", () => {
        it("Create a new Linker object with a random shortcut", (done) => {
            chai.request(server)
                .post("/create")
                .type("form")
                .send({
                    link: "https://johannespour.de",
                })
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("short");
                    res.body.should.have.property("token");

                    example_short = res.body["short"];
                    example_token = res.body["token"];

                    done();
                });
        });

        it("Create a new Linker object with a certain shortcut", (done) => {
            chai.request(server)
                .post("/create")
                .type("form")
                .send({
                    link: "https://example.com",
                    short: "test",
                })
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("short", "test");
                    res.body.should.have.property("token");
                    done();
                });
        });

        it("Create a new Linker object without any parameters", (done) => {
            chai.request(server)
                .post("/create")
                .end((_err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("GET /links", () => {
        it("Get all the current linker objects", (done) => {
            chai.request(server)
                .get("/links")
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property(
                        "test",
                        "https://example.com"
                    );
                    done();
                });
        });
    });

    describe("GET /:short", () => {
        it("Use shortcut", (done) => {
            chai.request(server)
                .get("/test")
                .redirects(0)
                .end((_err, res) => {
                    res.should.have.status(301);
                    done();
                });
        });

        it("Use non-existent shortcut", (done) => {
            chai.request(server)
                .get("/ThisShortcutDoesNotExist")
                .end((_err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("GET /:short/json", () => {
        it("Get json data from existing shortcut", (done) => {
            chai.request(server)
                .get("/test/json")
                .end((_err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("short", "test");
                    res.body.should.have.property(
                        "destination",
                        "https://example.com"
                    );
                    done();
                });
        });

        it("Get data from not existing shortcut", (done) => {
            chai.request(server)
                .get("/ThisShortcutDoesNotExist/json")
                .end((_err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("PUT /:short", () => {
        it("Change the destination of the Shortcut", (done) => {
            chai.request(server)
                .put(`/${example_short}`)
                .type("form")
                .send({
                    link: "https://example.com/put-test",
                    token: example_token,
                })
                .end((_err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("DELETE /:short", () => {
        it("Delete a shortcut", (done) => {
            chai.request(server)
                .delete(`/${example_short}`)
                .type("form")
                .send({
                    token: example_token,
                })
                .end((_err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
