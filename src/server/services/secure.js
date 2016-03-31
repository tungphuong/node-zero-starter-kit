/**
 * Created by tungp on 24/03/16.
 */
"use strict";
import passport from 'passport';
import localStrategy from 'passport-local'
import co from 'co'
import dbHelper from '../lib/dbHelper';
import _ from 'lodash';

let Strategy = localStrategy.Strategy;

class Secure {
  setup(app) {
    let that = this;
    app.use(passport.initialize());
    passport.use(new Strategy({
      usernameField: 'Username',
      passwordField: 'Password',
      session: false,
      passReqToCallback: true
    }, (req, userName, password, done)=> {
      that._login(userName, password).then((user)=> {
        return done(null, user);
      }).catch((err)=> {
        return done(null, false, err);
      });
    }));
  }

  _login(userName, password) {
    return co(function* login() {
      yield dbHelper.openConnection();
      let sql = 'SELECT UserName, Password FROM user WHERE UserName = ? limit 1';
      let user = yield  dbHelper.runQuery(sql, [userName]);
      if (user.length == 0) {
        throw({AppCode: 'MSG_ERR_USER_AUTHENTICATION_FAIL'});
      }
      if (_.isEmpty(user[0].Password)) {
        throw({AppCode: 'MSG_ERR_USER_CORRUPT_DATA'});
      }
      if (user[0].Password === password) {
        //create hash here
        //
      }
      else {
        throw({AppCode: 'MSG_ERR_USER_AUTHENTICATION_FAIL'});
      }
      dbHelper.closeConnection();

      return user[0];
    });
  }
}

export default new Secure();