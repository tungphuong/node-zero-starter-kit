import mysql = require('mysql');
import configHelper from '../../shared/confighelper';
import util from '../../shared/utilhelper';

class dbHelper {
  private pool:mysql.IPool;
  private client:mysql.IConnection;

  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 100, //important
      host: configHelper.db_host,
      port: configHelper.db_port,
      user: configHelper.db_user,
      password: configHelper.db_password,
      database: configHelper.db_databasename,
      debug: false
    });

    this.client = null;
  }

  openConnection() {
    console.log(configHelper.db_host);
    return new Promise((resolve, reject)=> {
      this.pool.getConnection((err, conn)=> {
        if (err) {
          util.Logger.debug(err);
          console.log(err);
          reject(err);
        } else {
          resolve(conn);
          this.client = conn;
        }
      });
    });
  }

  closeConnection() {
    this.client.destroy();
  }

  runQuery(sql, params) {
    return new Promise((resolve, reject)=> {
      let query;
      query = this.client.query(sql, params, (err, result)=> {
        if (!err) {
          resolve(result);
        } else {
          console.log(err);
          reject(err);
        }
      });
      util.Logger.debug(query.sql);
    });
  }

}

export default new dbHelper();