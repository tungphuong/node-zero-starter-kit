/**
 * Created by tungp on 24/03/16.
 */

import mysql from 'mysql';
import config from '../../configuration/config';

let pool = mysql.createPool({
    connectionLimit: 100, //important
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    debug: false
});

class dbHelper {
    constructor(){
        this.client = null;
    }
    
    openConnection() {
        let that = this;
        return new Promise((resolve, reject)=> {
            pool.getConnection((err, conn)=> {
                if (!err) {
                    resolve(conn);
                    that.client = conn;
                }
                else {
                    reject(err);
                }
            });
        });
    }

    closeConnection() {
        this.client.release();
    }

    runQuery(sql, params) {
        let that = this;
        return new Promise((resolve, reject)=> {
            let query = that.client.query(sql, params, (err, result)=> {
                if (!err) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
            console.log(query.sql);
        });
    }

}

export default new dbHelper();
