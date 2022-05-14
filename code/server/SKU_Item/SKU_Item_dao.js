const { S } = require('../node_modules/xmlchars/xml/1.0/ed5.js');

class SKUItemDao {
    // DB = require('./../EZWH_db.js');
    DB = require('../EZWH_db/EZWH_db.js');
    db = (new DB('EZWH_db/EZWH_db')).getDB();
    SKUITEM = require('./SKU_Item.js')

    sqlite = require('sqlite3');

    /*newSKUItemTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS SKUITEMS(RFID INTEGER PRIMARY KEY NOT NULL, SKUID INTEGER, AVAILABILITY INTEGER, VOLUME INTEGER, NOTES VARCHAR, POSITION BIGINT, AVAILABLEQUANTITY INTEGER, DATEOFSTOCK DATETIME, FOREIGN KEY(SKUID) REFERENCES SKUS(ID)';
            db.run(sql, (err) => {
                if (err) {
                    reject(503);
                    return;
                }
                resolve(this.rfid);
            });

        });
    }

    newSKUItem(skuItem) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO SKUITEMS(RFID, SKUID, AVAILABILITY, DATEOFSTOCK) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run(sql, [skuItem.getRfid(), skuItem.getSKUId(), skuItem.getAvailability(), sku.getAvailability(), sku.getDateOfStock()], (err) => {
                if (err) {
                    reject(503);
                    return;
                }
                resolve(201);
            });
        });
    } */

    getSKUItems() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKU_ITEM';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const skuItems = rows.map((r) => (
                    {
                        rfid: r.rfid,
                        SKUId: r.SKUId,
                        Available: r.Available,
                        DateOfStock: r.DateOfStock
                    }));
                resolve(skuItems);
            });
        });
    }

    getSKUItemsBySKUID(SKUId) {
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
                    const sql = 'SELECT * FROM SKU_ITEM WHERE SKUID= ? AND AVAILABLE=1';
                    db.all(sql, [SKUId
                    ], (err, rows) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const skuItems = rows.map((r) => (
                            {
                                rfid: r.rfid,
                                SKUId: r.SKUId,
                                Available: r.Available,
                                DateOfStock: r.DateOfStock
                            }));
                        resolve(skuItems);
                    });
                } else {
                    console.log('No sku associated to ID');
                    reject(404);
                }
            });

        });
    }

    getSKUItemsByRfid(rfid) {
        return new Promise((resolve, reject) => {
            const checkRfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID= ?';
            let exists = 0;
            db.all(checkRfid, [rfid], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                res[0]['COUNT(*)'] > 0 ? exists = 1 : exist;

                if (exists) {
                    const sql = 'SELECT * FROM SKU_ITEM WHERE RFID = ?';
                    db.all(sql, [rfid], (err, rows) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const skuItems = rows.map((r) => (
                            {
                                rfid: r.rfid,
                                SKUId: r.SKUId,
                                Available: r.Available,
                                DateOfStock: r.DateOfStock
                            }));
                        resolve(skuItems[0]);
                    });
                } else {
                    console.log('No SKU Item associated to Rfid');
                    reject(404);
                }
            });

        });
    }

    modifySKUItem(rfid) {
        return new Promise((resolve, reject) => {
            const checkRfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID= ?';
            let exists = 0;
            db.all(checkRfid, [rfid], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                res[0]['COUNT(*)'] > 0 ? exists = 1 : exist;

                if (exists) {
                    const sql = 'SELECT * FROM SKU_ITEM WHERE RFID = ?';
                    db.all(sql, [rfid], (err, rows) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const sql = 'UPDATE SKU_ITEM SET RFID= ?, AVAILABLE = ?, DATEOFSTOCK = ? WHERE RFID = ?';
                        db.run(sql, [skuItem.newRfid, skuItem.newAvailable, skuItem.DateOfStock], (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(true);
                            }
                        });
                    });
                } else {
                    console.log('No SKU Item associated to Rfid');
                    reject(404);
                }
            });

        });
    }

    deleteSKUItembyRfid(rfid) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM SKU_ITEM WHERE RFID = ?';
            db.run(sql, [rfid], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

module.exports = SKUItemDao;