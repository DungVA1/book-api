const expect = require('chai').expect;
const mongoose = require('mongoose');
const sinon = require('sinon');
const { saveUser, searchUser } = require('./test2');
const { User } = require('./test');

describe('Tyr', () => {
  let stubUser;
  let stubUserInstance;
  let stubCon;
  beforeEach(() => {
    stubCon = sinon.stub(mongoose, 'connect').returns(true);
    stubUser = sinon.stub(mongoose.Model, 'find').returns({
      limit: function () {
        return {
          exec: function () {
            return Promise.resolve([]);
          },
        };
      },
    });
    stubUserInstance = sinon.stub(User.prototype, 'save').yields(undefined, 'No');
  });

  afterEach(() => {
    mongoose.disconnect();
    stubCon.restore();
    stubUser.restore();
    stubUserInstance.restore();
  });

  it('TeSTTTT', async () => {
    try {
      const res = await saveUser();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  });

  it('TeSTTTT2', async () => {
    try {
      const res = await searchUser();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  });
});