const supertest = require('supertest');
const chai = require('chai');
const index = require('./index');
const app = index.app;

describe('express app, using supertest', () => {
  // required cb "done"
  it('GET / - 200 Hello world!', done => {
    const content = 'Hello world!';
    supertest(app)
      .get('/')
      .expect('Content-Type', /text\/html; charset=utf-8/)
      .expect('Content-Length', content.length + '')
      .expect(200)
      .expect(content)
      .end(err => {
        if (err) throw err;
        done();
      });
  });

  describe('describe can be nested', () => {

    it('GET /error - 404 Page not found.', done => {
      const content = {
        error: 'Page not found.'
      };
      supertest(app)
        .get('/error')
        .expect(404)
        .expect(res => {
          chai.expect(res.body)
            .to.include(content)
            .to.be.a('object');
        })
        .end(err => {
          if (err) throw err;
          done();
        });
    });

  });

});
