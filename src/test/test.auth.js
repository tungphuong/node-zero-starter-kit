require("babel-polyfill");
var util = require('./test.util');
import app from '../server/services/main'
var request = require('supertest');

describe('auth', function () {
  it('should login successfully', function (done) {
    request(app)
      .post('/api/auth/login')
      .send({
        Username: 'admin',
        Password: 'admin'
      })
      .expect(200)
      .end(function (err, res) {
        done();
      })
  })
});

