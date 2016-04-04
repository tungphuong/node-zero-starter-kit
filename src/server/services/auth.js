import express from 'express';
import passport from 'passport';
import cryptoHelper from '../../shared/cryptohelper';

let router = express.Router();

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
