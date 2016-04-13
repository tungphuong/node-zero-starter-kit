import nconf = require('nconf');
import path = require('path');

class ConfigHelper {
  constructor() {
    //load configuration
    nconf.argv().env(['USER']);
    nconf.file(path.join(__dirname, '../../config', 'config.default.json'));
    nconf.file(path.join(__dirname, '../../config', `config.${process.env.NODE_ENV}.json`));
  }

  get db_host() {
    return nconf.get('database:host');
  }

  get db_port() {
    return nconf.get('database:port');
  }

  get db_user() {
    return nconf.get('database:user');
  }

  get db_password() {
    return nconf.get('database:password');
  }

  get db_databasename() {
    return nconf.get('database:database');
  }

  get webserver_port() {
    return nconf.get('webserver:port');
  }

  get jwtSecret() {
    return nconf.get('jwtSecret');
  }
}

export default new ConfigHelper();

