import bunyan = require('bunyan');

class UtilHelper{
  private _logger: bunyan.Logger;

  constructor(){
    this._logger = bunyan.createLogger({
      name: 'Node Zero',
      level: 'debug'
    });
  }

  get Logger(){
    return this._logger;
  }
}

export default new UtilHelper();