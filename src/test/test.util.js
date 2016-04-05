require("babel-polyfill");

import app from '../server/services/main';
import request from 'supertest';

class TestUtil{
  constructor(){
    this.token = null;
    this.supertest = request(app);
  }

  login(done){
    let that = this;
    this.supertest
      .post('/api/auth/login')
      .send({
        Username: 'admin',
        Password: 'admin'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if(err){
          return done(err);
        }
        that.token = res.body.token;
        done()
      });
  }
}

export default new TestUtil();