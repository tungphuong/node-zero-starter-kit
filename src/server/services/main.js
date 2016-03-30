'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import auth from './auth';
import secure from './secure';
import nconf from 'nconf';
import path from 'path';
import morgan from 'morgan'

let app = express();

//load configuration
nconf.argv().env(['USER']);
nconf.file(path.join(__dirname, '../../../config', 'config.default.json'));
nconf.file(path.join(__dirname, '../../../config', `config.${process.env.NODE_ENV}.json`));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('combined'))

secure.setup(app);


app.use('/api/auth', auth);

export default app;
