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
      UserName: user.UserName
    });

    res.json({
      Token: jwtToken,
      UserName: user.UserName
    });
  })(req, res, next);
});

export default router;
