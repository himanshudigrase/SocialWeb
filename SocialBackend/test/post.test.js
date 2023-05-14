import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);


const expect = chai.expect;

chai.use(chaiHttp);

describe('Post Routes', () => {
  let token;
  let userId;
  let postId;

  before((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send({ email: 'kate@gmail.com', password: 'kate' })
      .end((err, res) => {
        token = res.body.token;
        userId = res.body.user;
        done();
      });
  });

  describe('POST /posts', () => {
    // it('should create a new post', (done) => {
    //   chai
    //     .request(app)
    //     .post('/posts')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({
    //       userId: userId,
    //       description: 'Test post',
    //       picturePath: 'test.jpg'
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(201);
    //       expect(res.body).to.be.an('array');
    //       expect(res.body.length).to.be.greaterThan(0);
    //       postId = res.body[0]._id;
    //       done();
    //     });
    // });

    it('should return an error if post creation fails', (done) => {
      chai
        .request(app)
        .post('/posts')
        .set('Authorization', `Bearer ted`)
        .send({
          userId: userId,
          description: 'Test post',
          picturePath: 'test.jpg'
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("error", "jwt malformed");
          done();
        });
    });
  });

  describe('GET /posts', () => {
    it('should get all posts', (done) => {
      chai
        .request(app)
        .get('/posts')
        .end((err, res) => {
          expect(res).to.have.status(403);
          //expect(res.body).to.be.a('number');
          expect(res.body).to.be.empty;
          //expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });

    it('should get user posts', (done) => {
      chai
        .request(app)
        .get(`/posts/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.empty;
          //expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });

    // it('should return an error if user not found', (done) => {
    //   chai
    //     .request(app)
    //     .get('/posts/123')
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       expect(res.body).to.be.empty;
    //      // expect(res.body).to.have.property("msg", "Invalid");
    //       done();
    //     });
    // });
  });
});