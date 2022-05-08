class EZWH_db {
    #sqlite3 = require('sqlite3');
    #fs = require('fs');
    #db = undefined

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
        var dbFile = './' + dbname + '.db';
        /*var dbExists = this.#fs.existsSync(dbFile);
        console.log(dbExists);

        if (!dbExists) {
            this.#fs.openSync(dbFile,'w');
        }*/

        this.#db = new this.#sqlite3.Database(dbFile);
    }

    getDB() {
        return this.#db;
    }

    /*newSKUTable() {
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
        this.#db.close();
    }*/


}

module.exports = EZWH_db;