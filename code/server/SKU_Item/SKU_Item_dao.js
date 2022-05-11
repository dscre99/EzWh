const { S } = require('../node_modules/xmlchars/xml/1.0/ed5.js');

class SKUItemDao {
    DB = require('./../EZWH_db.js');
    SKUITEM = require('./SKU_Item.js')

    sqlite = require('sqlite3');

    #db = undefined;
    constructor(db) {
        this.#db = db;
    }

    newSKUItemTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS SKUITEMS(RFID INTEGER PRIMARY KEY NOT NULL, SKUID INTEGER, AVAILABILITY INTEGER, VOLUME INTEGER, NOTES VARCHAR, POSITION BIGINT, AVAILABLEQUANTITY INTEGER, DATEOFSTOCK DATETIME, FOREIGN KEY(SKUID) REFERENCES SKUS(ID)';
            this.#db.run(sql, (err) => {
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
            this.#db.run(sql, [skuItem.getRfid(), skuItem.getSKUId(), skuItem.getAvailability(), sku.getAvailability(), sku.getDateOfStock()], (err) => {
                if (err) {
                    reject(503);
                    return;
                }
                resolve(201);
            });
        });
    }

    getSKUItems() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUITEMS';
            this.#db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const skuItems = rows.map((r) => (
                    {
                        rfid: r.rfid,
                        SKUId: r.SKUId,
                        Available: r.Available,
                        DateOfStock: r.DateOfStock;
                    }));
                resolve(skuItems);
            });
        });
    }

    getSKUItemsBySKUID(SKUId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUITEMS WHERE SKUID= ? AND AVAILABLE=1';
            this.#db.all(sql, [SKUId
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
                        DateOfStock: r.DateOfStock;
                    }));
                resolve(skuItems);
            });
        });
    }

    getSKUItemsByRfid(rfid) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUITEMS WHERE RFID = ?';
            this.#db.all(sql, [rfid], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const skuItems = rows.map((r) => (
                    {
                        rfid: r.rfid,
                        SKUId: r.SKUId,
                        Available: r.Available,
                        DateOfStock: r.DateOfStock;
                    }));
                resolve(skuItems[0]);
            });
        });
    }

    modifySKUItem(rfid) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUITEMS SET RFID= ?, AVAILABLE = ?, DATEOFSTOCK = ? WHERE RFID = ?';
            this.#db.run(sql, [skuItem.newRfid, skuItem.newAvailable, skuItem.DateOfStock], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    deleteSKUItembyRfid(rfid) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM SKUITEMS WHERE RFID = ?';
            this.#db.run(sql, [rfid], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

module.exports = SKUItem;