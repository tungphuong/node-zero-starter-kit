import testUtil from './test.util';
var expect = require('chai').expect;

describe('auth', function () {
  before(function (done) {
    testUtil.login(done);
  });

  it('should run test ok', function (done) {
      testUtil.supertest
        .get('/api/user/test')
        .set('Authorization', testUtil.token)
        .expect(200)
        .end(function (err, res) {
          if(err){
            return done(err);
          }
          expect(res.body.test).to.be.equal('hello');
          done();
        })
    });
});

