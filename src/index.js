"use strict";
import "babel-polyfill";
import app from './services/main';

let server = app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening on port ${server.address().port}`);
});

