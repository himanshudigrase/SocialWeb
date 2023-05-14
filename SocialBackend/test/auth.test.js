import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe("login", () => {
  // it("should return a token and user object on successful login", async () => {
  //   const res = await chai
  //     .request(app)
  //     .post("/auth/login")
  //     .send({ email: "kate@gmail.com", password: "kate" });
  //     expect(res).to.have.status(200);
  //   // expect(res.body).to.have.property("token");
  //   // expect(res.body).to.have.property("user");
  //  //expect(res.body.user).to.have.property("email", "kate@gmail.com");
  //   // add more assertions for the user object properties if needed
  // });

  it("should return an error message if user does not exist", async () => {
    const res = await chai
      .request(app)
      .post("/auth/login")
      .send({ email: "nonexistent@gmail.com", password: "password123" });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property("msg", "User does not exist.");
  });

  it("should return an error message if password is incorrect", async () => {
    const res = await chai
      .request(app)
      .post("/auth/login")
      .send({ email: "kate@gmail.com", password: "wrongpassword" });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property("msg", "Invalid credentials.");
  });
});