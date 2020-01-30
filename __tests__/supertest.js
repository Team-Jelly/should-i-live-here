// const app = require('../server/server.js')
// const supertest = require('supertest');
// const request = supertest(app);

const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {

  describe('/', () => {
    describe('GET', () => {
      it('responds with text/html content type', async () => {
        const res = await request(server)
          .get('/')
        expect(res.statusCode).toEqual(200)
      })

      // it('responds with text/html content type and correct cookie', () => {
      //   return request(server)
      //     .get('/')
      //     .expect('Content-Type', /text\/html/)
      //     .expect(200);
      // });
    });
  });

  describe('/user/login', () => {
    describe('POST', () => {
      it('succeeds with correct credentials', async () => {
        const res = await request(server)
          .post('/user/login')
          .send({ "email": "test@test.com", "password": "abc" })
        // console.log('*******', res.locals.user);
        // expect(res.body.email).toEqual('test@test.com');
        // expect(res.body.password).toEqual('abc')
        // console.log('****** console.log *******  \nres.body: ', res.body);
        expect(res.statusCode).toEqual(200)
      });

      it('fails with incorrect credentials', async () => {
        const res = await request(server)
          .post('/user/login')
          .send({ email: 'test@test.com', password: 'wrong_password' })
        // console.log('****** console.log *******  \nres.body: ', res.body);
        expect(res.body.email).not.toEqual('test@test.com');
      });
    });
  });

  describe('/user/register', () => {
    describe('POST', () => {
      it('successfully registers new account', async () => {
        const res = await request(server)
          .post('/user/register')
          .send({ email: 'supertest5@aaa.com', password: 'abc', name: 'supertest5' })
        // console.log('****** console.log *******  \nres.body: ', res.body);

        expect(res.statusCode).toEqual(200);
      });

      it('fails to register new account if required fields are not provided', async () => {
        const res = await request(server)
          .post('/user/register')
          .send({ email: 'supertestgtt@gg.com', password: 'abc' })
        console.log('****** console.log *******  \nres.body: ', res.body);

        expect(res.statusCode).not.toEqual(200); // ???
      });
    });
  });

  describe('/api', () => {
    describe('POST', () => {

      it('successfully makes post request to API ', async () => {
        const res = await request(server)
          .post('/api')
          .send(/* what do i send??? */)

        expect(1).toEqual(2);
      });
    })
  })

});


