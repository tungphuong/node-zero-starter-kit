/**
 * Created by tungp on 24/03/16.
 */
"use strict";
import passport from 'passport';
import localStrategy from 'passport-local'
import co from 'co'
import dbHelper from '../lib/dbHelper';

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
            that._login(userName, password).then(()=> {
                return done(null, {
                    userName: 'jacky'
                });
            }).catch((err)=> {
                return done(null, false, err);
            });
        }));
    }

    _login(userName, password) {
        return co(function* login() {
            yield dbHelper.openConnection();
            let sql = 'SELECT UserName, Password FROM User WHERE UserName = ? limit 1';
            let user = yield  dbHelper.runQuery(sql, [userName]);
                if (user.length == 0) {
                throw({AppCode: 'MSG_ERR_USER_AUTHENTICATION_FAIL'});
            }
            dbHelper.closeConnection();
        });
    }
}

export default new Secure();