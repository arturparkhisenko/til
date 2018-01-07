// https://mochajs.org/#table-of-contents
// assertion libraries:
//  chai, expect, should
//  chai: expect, should, assert http://chaijs.com/
const chai = require('chai');
const utils = require('./utils');

// - first `it` error stops code running
// - we can generate `it` with different values

describe('basic, using mocha and chai', () => {

  // usual mocha
  it('should add 2 numbers', () => {
    const expected = 6;
    const result = utils.add(4, 2);

    if (result !== expected) {
      throw new Error(`Expected ${expected}, but got ${result}!`);
    }
  });

  // asserts: chai ----------------------

  it('chai: should add 2 numbers', () => {
    const expected = 6;
    const result = utils.add(4, 2);

    // chai.assert.equal(result, expected,
    //   'chai.assert should add 2 numbers');

    chai.expect(result)
      .to.equal(expected)
      .to.be.a('number');
  });

  it('chai: compare objects', () => {
    const expected = {
      name: 'Andrew'
    };
    const result = {
      name: 'Andrew'
    };

    chai.expect(result)
      .to.deep.equal(expected); // for objects
  });

  it('chai: array/object include/exclude', () => {
    const arr = [2, 3, 4];
    const obj = {
      a: 1,
      b: 2
    };

    chai.expect(arr)
      .to.include(3)
      .to.not.include(1);

    chai.expect(obj)
      .to.have.property('a')
      .to.not.have.property('b');

    chai.expect(obj)
      .to.have.deep.property('a', 1);

    chai.expect(obj)
      .to.deep.include({
        a: 1
      });
  });

  it('chai: test setName', () => {
    const user = {
      age: 18
    };
    const fullName = 'John Doe';

    const resultDefault = utils.setName();
    const result = utils.setName(user, fullName);

    chai.expect(resultDefault)
      .to.have.property('firstName');
    chai.expect(resultDefault)
      .to.have.property('secondName');

    chai.expect(result)
      .to.have.property('firstName');
    chai.expect(result)
      .to.have.property('secondName');

    chai.expect(result)
      .to.have.deep.property('age', user.age);
    chai.expect(result)
      .to.have.deep.property('firstName', 'John');
    chai.expect(result)
      .to.have.deep.property('secondName', 'Doe');

    chai.expect(result)
      .to.deep.include({
        age: user.age,
        firstName: 'John',
        secondName: 'Doe'
      });
  });

  // async code ----------------------

  // required cb "done"
  it('chai: test asyncAdd and asyncAddCb', done => {
    const expected = 6;

    const resultCb = utils.asyncAddCb(4, 2, res => {
      chai.expect(res)
        .to.equal(expected)
        .to.be.a('number');
      done();
    });

    const result = utils.asyncAdd(4, 2);
    if (!result.then) {
      throw new Error('Not a promise');
    }

    result.then(res => {
        chai.expect(res)
          .to.equal(expected)
          .to.be.a('number');

        chai.expect(resultCb)
          .to.equal(res)
          .to.be.a('number');
      })
      .catch(error => {
        throw error
      });
  });

});
