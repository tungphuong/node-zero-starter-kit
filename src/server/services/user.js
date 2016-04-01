import express from 'express';
import secure from './secure';

let router = express.Router();

router.get('/test', secure.checkAuth ,(req, res)=> {
  res.json({test:'hello'});
});

export default router;
