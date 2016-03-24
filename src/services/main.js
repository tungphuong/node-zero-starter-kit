'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import auth from './auth';
import secure from './secure';

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

secure.setup(app);

app.use('/api/auth', auth);

export default app;
