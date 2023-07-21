import { assert } from "chai";
import chaiHttp from "chai-http";
import chai from "chai";

import app from "../src/app.js";

chai.use(chaiHttp);

let server = app.listen(3000);

describe("ENDPOINT FIND ALL VALIDATION", () => {
  it("Validate that response code is a 200, response contains object and is an array", (done) => {
    chai
      .request(server)
      .get("/api/v1/anime")
      .end((err, res) => {
        let reply = res.body;
        assert.equal(res.status, 200, "Status code does not apply.");
        assert.isObject(res.body, "Response must be an object");
        assert.isArray(reply.anime, "Response is not an array");
        done();
      });
  });
});

