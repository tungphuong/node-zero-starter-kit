import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
import cluster = require('cluster');
import morgan = require("morgan");
import auth from './auth';
import secure from './secure';
import user from './user';
import util from '../../shared/utilhelper';

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan("combined"));

secure.setup(app);

app.use('/app', express.static(path.resolve('dist/app')));
app.use('/libs', express.static(path.resolve('dist/libs')));

if(process.env.NODE_ENV !== 'test'){
  app.use((req, res, next)=>{
   util.Logger.info( `Cluster ${cluster.worker.process.pid} responsed.`);
   next();
   });
}

app.use('/api/auth', auth);
app.use('/api/user', user);

app.get('/*', (req, res)=>{
  res.sendFile(path.resolve('dist/index.html'));
});


export default app;
