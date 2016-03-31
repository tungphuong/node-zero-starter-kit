/**
 * Created by tungp on 24/03/16.
 */
"use strict";

import express from 'express';
import passport from 'passport';

let router = express.Router();

router.get('/test', (req, res)=> {
  res.send('hello demo');
});

router.post('/login', (req, res, next)=> {
  passport.authenticate('local', (err, user, info)=> {
    let error = err || info;
    if (error) {
      console.log(error);
      res.status(500).json(error);
    }
    res.json(user);
  })(req, res, next);
});

export default router;
