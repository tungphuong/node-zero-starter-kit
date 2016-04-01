import "babel-polyfill";
import nconf from 'nconf';
import app from './services/main';
import chalk from 'chalk';

let server = app.listen(nconf.get('webserver:port') || 5000, ()=> {
  console.log(chalk.red.bgWhite.bold(`Listening on port ${server.address().port}`));
});