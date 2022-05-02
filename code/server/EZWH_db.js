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

    newSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS SKUS(ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRIPTION VARCHAR, WEIGHT INTEGER, VOLUME INTEGER, NOTES VARCHAR, POSITION BIGINT, AVAILABLEQUANTITY INTEGER, PRICE FLOAT, TESTDESCRIPTORS VARCHAR)';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('SKUS');
            });
        });
    }

    newSKU(data) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO SKUS(DESCRIPTION, WEIGHT, VOLUME, NOTES, POSITION, AVAILABLEQUANTITY, PRICE, TESTDESCRIPTORS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            this.db.run(sql, [data.description, data.weight, data.volume, data.notes, data.position, data.availableQuantity, data.price, data.testDescriptors], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }

    getSKU(data) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUS WHERE ID=?';
            this.db.all(sql, [data.id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                //console.log(rows[0]);
                const sku = rows.map((r) => (
                    {
                        id: r.ID,
                        description: r.description,
                        weight: r.weight,
                        volume: r.volume,
                        notes: r.notes,
                        position: r.position,
                        availableQuantity: r.availableQuantity,
                        price: r.price,
                        testDescriptors: r.testDescriptors
                    }
                ));
                resolve(sku[0]);
            });
        });
    }

    close() {
        this.db.close();
    }


}

module.exports = EZWH_db;