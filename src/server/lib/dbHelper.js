import mysql from 'mysql';
import configHelper from '../../shared/confighelper';
import util from '../../shared/utilhelper';

class dbHelper {
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
    let that = this;
    return new Promise((resolve, reject)=> {
      that.pool.getConnection((err, conn)=> {
        if (err) {
          util.getLogger().debug(err);
          reject(err);
        } else {
          resolve(conn);
          that.client = conn;
        }
      });
    });
  }

  closeConnection() {
    this.client.destroy();
  }

  runQuery(sql, params) {
    let that = this;
    return new Promise((resolve, reject)=> {
      let query;
      query = that.client.query(sql, params, (err, result)=> {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
      util.getLogger().debug(query.sql);
    });
  }

}

export default new dbHelper();