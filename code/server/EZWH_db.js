class EZWH_db {
    sqlite3 = require('sqlite3');
    fs = require('fs');
    db = null

    constructor(dbname) {
        /*this.db = new this.sqlite3.Database(dbname, (err) => {
            //console.log(err)
            if(err){
                if(err.errno == 1){
                    this.db.open(dbname)
                } else {
                    console.log('Could not connect to database', err)
                }
            } else {
                console.log('Connected to database')
            }
        });*/
        var dbFile = dbname + " .db";
        /*var dbExists = this.fs.existsSync(dbFile);
        console.log(dbExists);

        if (!dbExists) {
            this.fs.openSync(dbFile,'w');
        }*/

        this.db = new this.sqlite3.Database(dbFile);
    }

    newUserTable(){
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS USERS(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME VARCHAR, SURNAME VARCHAR, EMAIL VARCHAR, PASSWORD VARCHAR, TYPE VARCHAR)';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                //let value = 'USERS'
                resolve('USERS');
            });
        });
    }

    newUser(data){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO USERS(NAME, SURNAME, EMAIL, PASSWORD, TYPE) VALUES (?, ?, ?, ?, ?)';
            this.db.run(sql, [data.name, data.surname, data.username, data.password, data.type], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.username);
            });
        });
    }

    getUser(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM USERS WHERE EMAIL=?';
            this.db.all(sql, [data.username], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                //console.log(rows[0]);
                const user = rows.map((r) => (
                    {
                        id:r.ID,
                        name:r.NAME,
                        surname:r.SURNAME,
                        email:r.EMAIL,
                        password:r.PASSWORD,
                        type:r.TYPE
                    }
                ));
                resolve(user[0]);
            });
        });
    }

    close() {
        this.db.close();
    }
}

module.exports = EZWH_db;