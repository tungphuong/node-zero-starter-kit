import "babel-polyfill";
import nconf from 'nconf';
import app from './services/main';
import chalk from 'chalk';

let server = app.listen(nconf.get('webserver:port') || 5000, ()=> {
  chalk.red.bgWhite(`Listening on port ${server.address().port}`);
});