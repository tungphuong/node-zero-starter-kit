"use strict";
import "babel-polyfill";
import nconf from 'nconf';
import app from './services/main';

console.log('hello1 22 555566666');
let server = app.listen(nconf.get('webserver:port') || 5000, ()=>{
    console.log(`Listening on port ${server.address().port}`);
});

