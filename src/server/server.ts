'use strict';
import configHelper from '../shared/confighelper';
import app from './services/main';
import utilHelp from '../shared/utilhelper';
import cluster = require('cluster');
import os = require('os');

if (cluster.isMaster) {
    let numCPUs = os.cpus().length;
    utilHelp.Logger.info('info', `Fork ${numCPUs} from Masters`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        console.log('Worker is running on %s pid', worker.process.pid);
    });
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker with %s is closed', worker.process.pid);
    });
}
else if (cluster.isWorker) {
    let port = configHelper.webserver_port || 5000;
    app.listen(port, ()=> {
        utilHelp.Logger.info(`worker ${cluster.worker.process.pid} is now listening on port ${port}`);
    });
}