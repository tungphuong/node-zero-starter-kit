import express = require('express');
import passport = require('passport');
import cryptoHelper from '../../shared/cryptohelper';

let router = express.Router();

router.get('/test', (req, res)=>{
  res.json({});
});

router.post('/login', (req, res, next)=> {
  passport.authenticate('local', (err, user, info)=> {
    let error = err || info;
    if (error) {
      res.status(500).json(error);
    }
    let jwtToken = cryptoHelper.createJWTToken({
      username: user.username
    });
    res.json({
      token: jwtToken,
      username: user.username
    });
  })(req, res, next);
});

export default router;
