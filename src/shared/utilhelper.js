import winston from 'winston';

class UtilHelper {
  constructor() {
    this.logger = new (winston.Logger)({
      level: 'debug',
      transports: [
        new (winston.transports.Console)()
      ]
    });
  }

  getLogger() {
    return this.logger;
  }
}

export default new UtilHelper();