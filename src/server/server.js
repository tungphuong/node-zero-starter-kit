"use strict";
import "babel-polyfill";
import configHelper from '../shared/confighelper';
import app from './services/main'

console.log(process.env.NODE_ENV);

let server = app.listen(configHelper.webserver_port || 5000, ()=> {
  console.log(`Listening on port ${server.address().port}`);
});