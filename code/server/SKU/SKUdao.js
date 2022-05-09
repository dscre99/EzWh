

class SKUDao {

    DB = require('./../EZWH_db.js');
    SKU = require('./SKU.js')

    sqlite = require('sqlite3');

    #db = undefined;
    constructor(db) {
        this.#db = db;
    }

    dropSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS SKUS';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.id)
            })
        });
    }

    newSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS SKUS(ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRIPTION VARCHAR, WEIGHT INTEGER, VOLUME INTEGER, NOTES VARCHAR, POSITION BIGINT, AVAILABLEQUANTITY INTEGER, PRICE FLOAT, TESTDESCRIPTORS VARCHAR)';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(201);
            });

        });
    }

    newSKU(sku) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO SKUS(DESCRIPTION, WEIGHT, VOLUME, NOTES, POSITION, AVAILABLEQUANTITY, PRICE) VALUES (?, ?, ?, ?, ?, ?, ?)';
            this.#db.run(sql, [sku.getDescription(), sku.getWeight(), sku.getVolume(), sku.getNotes(), sku.getPosition(), sku.getAvailableQuantity(), sku.getPrice()], (err) => {
                if (err) {
                    reject(503);
                    return;
                }
                resolve(sku.get);
            });
        });
    }

    getSKUs() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUS';
            this.#db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const skus = rows.map((r) => (
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
                    }));
                resolve(skus);
            });
        });
    }

    getSKUbyID(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUS WHERE ID=?';
            this.#db.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
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

    modifySKU(id) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUS SET description = ? ,weight= ?,volume= ?,notes= ?,availablequantity= ?,price= ? WHERE id = ?';
           this.#db.run(sql, [sku.newDescription, sku.newWeight, sku.newVolume, sku.newNotes, sku.newAvailableQuantity, sku.newPrice, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    modifySKUPosition(id, position) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUS SET position = ? WHERE id = ?';
           this.#db.run(sql, [position, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    deleteSKUbyID(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM SKUS WHERE id = ?';
            this.#db.run(sql, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }


}

module.exports = SKUDao;



