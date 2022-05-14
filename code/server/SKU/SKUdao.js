

class SKUDao {

    // DB = require('./../EZWH_db.js');
    DB = require('../EZWH_db/EZWH_db.js');
    db = (new DB('EZWH_db/EZWH_db')).getDB();
    SKU = require('./SKU.js')

    sqlite = require('sqlite3');

    /*dropSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS SKUS';
            db.run(sql, (err) => {
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
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(201);
            });

        });
    }*/

    newSKU(sku) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO SKU(DESCRIPTION, WEIGHT, VOLUME, NOTES, POSITION, AVAILABLEQUANTITY, PRICE) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [sku.getDescription(), sku.getWeight(), sku.getVolume(), sku.getNotes(), sku.getPosition(), sku.getAvailableQuantity(), sku.getPrice()], (err) => {
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
            const sql = 'SELECT * FROM SKU';
            db.all(sql, [], (err, rows) => {
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
            const checkSKUId = 'SELECT COUNT(*) FROM SKU WHERE ID= ?';
            let exists = 0;
            db.all(checkSKUId, [id], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                res[0]['COUNT(*)'] > 0 ? exists = 1 : exist;

                if (exists) {
                    const sql = 'SELECT * FROM SKU WHERE ID=?';
                    db.all(sql, [id], (err, rows) => {
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
                } else {
                    console.log('No SKU associated to ID');
                    reject(404);
                }
            });
        });
    }

    modifySKU(id) {
        return new Promise((resolve, reject) => {
            const checkId = "SELECT * FROM USERS WHERE ID= ?";
            let exists = 0;
            db.all(checkId, [id], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                if (exists) {
                    const checkPermission = "SELECT * FROM USERS WHERE ID= ? AND TYPE= 'MANAGER'";
                    let allowed = 0;
                    db.all(checkPermission, [id], (err, res) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        res[0]['COUNT(*)'] > 0 ? allowed = 1 : allowed;

                        if (allowed) {
                            const sql = 'UPDATE SKU SET description = ? ,weight= ?,volume= ?,notes= ?,availablequantity= ?,price= ? WHERE id = ?';
                            db.run(sql, [sku.newDescription, sku.newWeight, sku.newVolume, sku.newNotes, sku.newAvailableQuantity, sku.newPrice, id], (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(true);
                                }
                            });
                        } else {
                            console.log('SKUID not authorized');
                            reject(401);
                        }
                    }); 

                } else {
                    console.log('SKU Id does not exist');
                    reject(404);
                }
            });

        });
    }

    modifySKUPosition(id, position) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKU SET position = ? WHERE id = ?';
            db.run(sql, [position, id], (err) => {
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
            const sql = 'DELETE FROM SKU WHERE id = ?';
            db.run(sql, [id], (err) => {
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



