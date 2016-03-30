/**
 * Created by tungp on 24/03/16.
 */

import mysql from 'mysql';
import nconf from 'nconf';

let pool = mysql.createPool({
    connectionLimit: 100, //important
    host: nconf.get('database:host'),
    port: nconf.get('database:port'),
    user: nconf.get('database:user'),
    password: nconf.get('database:password'),
    database: nconf.get('database:database'),
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
