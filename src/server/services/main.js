'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import auth from './auth';
import secure from './secure';
import path from 'path';
import morgan from 'morgan'

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('combined'))

secure.setup(app);

app.use('/app', express.static(path.resolve('dist/app')));
app.use('/libs', express.static(path.resolve('dist/libs')));

var renderIndex = (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
}


app.use('/api/auth', auth);

app.get('/*', renderIndex);

export default app;
