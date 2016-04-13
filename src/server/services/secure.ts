import passport = require('passport');
import localStrategy = require('passport-local');
import _ = require('lodash');
import cryptoHelper from '../../shared/cryptohelper';
import dbHelper from '../lib/dbHelper';

class Secure {

  setup(app) {
    let that = this;
    app.use(passport.initialize());

    passport.use(new localStrategy.Strategy({
      usernameField: 'Username',
      passwordField: 'Password',
      passReqToCallback: true
    }, (req, userName, password, done)=> {
      that._login(userName, password).then((user)=> {
        return done(null, user);
      }).catch((err)=> {
        return done(null, false, err);
      });
    }));
  }

  checkAuth(req, res, next) {
    let token = (req.body && req.body.AccessToken) ||
      (req.query && req.query.AccessToken) ||
      req.headers['x-access-token'] ||
      req.headers['authorization'] ||
      req.headers['Authorization'] ||
      req.headers['access-token'];
    let decoToken;
    if (token) {
      if (_.startsWith(token, 'Bearer ')) {
        token = _.replace(token, 'Bearer ', '');
      }
      decoToken = cryptoHelper.decodeJwtToken(token);
    }
    if (decoToken != null) {
      return next();
    }
    else {
      res.status(401).json({AppCode: 'MSG_ERR_NO_VALID_TOKEN'});
    }
  }

  async _login(userName, password) {
    await dbHelper.openConnection();

    let sql = 'SELECT userName, password, salt FROM user WHERE UserName = ? limit 1';
    let user = await dbHelper.runQuery(sql, [userName]);
    if (user.length == 0) {
      throw({AppCode: 'MSG_ERR_USER_AUTHENTICATION_FAIL'});
    }
    if (_.isEmpty(user[0].password)) {
      throw({AppCode: 'MSG_ERR_USER_CORRUPT_DATA'});
    }

    var hashPassword = cryptoHelper.createHash(password, user[0].salt);
    if (user[0].password !== hashPassword) {
      throw({AppCode: 'MSG_ERR_USER_AUTHENTICATION_FAIL'});
    }

    dbHelper.closeConnection();

    return user[0];
  }
}

export default new Secure();