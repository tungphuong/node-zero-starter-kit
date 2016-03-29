"use strict";
import "babel-polyfill";
import nconf from 'nconf';
import app from './services/main';


let server = app.listen(nconf.get('webserver:port') || 3000, ()=>{
    console.log(`Listening on port ${server.address().port}`);
});

