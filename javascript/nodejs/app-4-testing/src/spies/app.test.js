const chai = require('chai');
const spies = require('chai-spies');
const rewire = require('rewire');
chai.use(spies);

const app = rewire('./app');

describe('App', () => {

  // use rewire replace
  const db = {
    saveUser: chai.spy()
  }
  app.__set__('db', db);

  it('should call the spy correctly', () => {
    // https://github.com/chaijs/chai-spies/blob/master/test/spies.js
    const spy = chai.spy('SpyName');
    spy('arg1', 42);
    chai.expect(spy).to.be.spy;
    chai.expect(spy).to.have.been.called();
  });

  it('should call the saveUser correctly', () => {
    const email = 'john@dou.com';
    const password = '123abc';

    app.handleSignup(email, password);

    chai.expect(db.saveUser).to.be.spy;
    chai.expect(db.saveUser).been.called();
    // chai.expect(db.saveUser).to.have.been.called.with(email, password);
  });
});
