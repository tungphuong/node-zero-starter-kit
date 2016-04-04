import "babel-polyfill";
import nconf from 'nconf';
import app from './services/main';
import util from '../shared/utilhelper';

let server = app.listen(nconf.get('webserver:port') || 5000, ()=> {
  util.getLogger().log('debug',`Listening on port ${server.address().port}`);
});