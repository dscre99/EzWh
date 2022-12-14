

class SKUItemDao {
    #db = undefined;

    constructor(dbInstance) {
        this.#db = dbInstance;
    }

    dropSKUItemTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS SKU_ITEM';
            this.#db.run(sql, (err) => {
                if (err) {
                    console.log('dropSKUItemTable error:', err);
                    reject(500);
                } else {
                    resolve(200);
                }
            });
        });
    }

    newSKUItemTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS "SKU_ITEM" ("RFID"	TEXT,"SKUID"	INTEGER,"AVAILABLE"	INTEGER,"DATEOFSTOCK" TEXT, PRIMARY KEY("RFID"))';
            this.#db.run(sql, (err) => {
                if (err) {
                    console.log('newSKUItemTable error:', err);
                    reject(500);
                }
                resolve(200);
            });
        });
    }

    newSKUItem(skuItem) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                //const check = 'SELECT ID FROM SKU WHERE ID = ?';
                const check = 'SELECT COUNT(*) FROM SKU WHERE ID = ?';
                let exists = 0;
                this.#db.all(check, [skuItem.SKUId], (err, res) => {
                    if (err) {
                        console.log('newSKUItem error:', err);
                        reject(503);
                    } else {
                        //res.length > 0 ? exists = 1 : exists;
                        res[0]['COUNT(*)'] > 0 ? exists=1 : exists
                        if (exists) {
                            const sql = 'INSERT INTO SKU_ITEM(RFID, SKUID, AVAILABLE, DATEOFSTOCK) VALUES (?, ?, ?, ?)';
                            this.#db.run(sql, [skuItem.RFID, skuItem.SKUId, 0, skuItem.DateOfStock], (err, rows) => {
                                
                                if (err) {
                                    console.log('newSKUItem error nested:', err);
                                    reject(503);
                                } else {
                                    resolve(201);
                                }
                            });
                        } else {
                            // console.log('No SKU associated to SKUID');
                            reject(404);
                        }
                    }
                });

            } else {
                //console.log('Not logged in or wrong permissions');
                reject(401);
            }
        });
    } 

    getSKUItems() {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {

                let database = this.#db;
                // this.#db.serialize(function() {
                    const sql1 = 'CREATE TABLE IF NOT EXISTS "SKU_ITEM" ("RFID"	TEXT,"SKUID"	INTEGER,"AVAILABLE"	INTEGER,"DATEOFSTOCK" TEXT, PRIMARY KEY("RFID"))';
                    database.run(sql1, (err1) => {
                        if (err1) {
                            console.log('getSKUItems CREATE TABLE error:', err1);
                            reject(500);
                        } else {
                            const sql2 = 'SELECT * FROM SKU_ITEM';
                            database.all(sql2, [], (err2, rows2) => {
                                if(err2){
                                    console.log('getSKUItems error nested:', err2);
                                    reject(503);
                                } else {
                                    const skuItems = rows2.map((r) => (
                                        {
                                            RFID: r.RFID, //was rfid 
                                            SKUId: r.SKUID,
                                            Available: r.AVAILABLE,
                                            DateOfStock: r.DATEOFSTOCK
                                        }
                                    ));
                                    resolve(skuItems);   
                                }
                            });
                        }
                    });
                // });
            } else {
                //console.log('Not logged in or wrong permissions');
                reject(401);
            }
        });
    }

    getSKUItemsBySKUID(SKUId) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const checkSKUId = 'SELECT COUNT(*) FROM SKU WHERE ID= ?';
                let exists = 0;
                this.#db.all(checkSKUId, [SKUId], (err, res) => {
                    if (err) {
                        console.log('getSKUItemsBySKUID error:', err);
                        reject(500);
                    } else {
                        res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                        if (exists) {
                            const sql = 'SELECT * FROM SKU_ITEM WHERE SKUID= ? AND AVAILABLE=1';
                            this.#db.all(sql, [SKUId
                            ], (err, rows) => {
                                if (err) {
                                    console.log('getSKUItemsBySKUID error nested:', err);
                                    reject(500);
                                } else {
                                    const skuItems = rows.map((r) => (
                                        {
                                            RFID: r.RFID, //was rfid 
                                            SKUId: r.SKUID,
                                            Available: r.AVAILABLE,
                                            DateOfStock: r.DATEOFSTOCK
                                        }));
                                    resolve(skuItems);
                                }
                            });
                        } else {
                            // console.log('No sku associated to ID');
                            reject(404);
                        }
                    }
                });
            } else {
                //console.log('Not logged in or wrong permissions');
                reject(401);
            }

        });
    }

    getSKUItemsByRfid(rfid) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const checkRfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID= ?';
                let exists = 0;
                this.#db.all(checkRfid, [rfid], (err, res) => {
                    if (err) {
                        console.log('getSKUItemsByRfid error:', err);
                        reject(500);
                    } else {
                        res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                        if (exists) {
                            const sql = 'SELECT * FROM SKU_ITEM WHERE RFID = ?';
                            this.#db.all(sql, [rfid], (err, rows) => {
                                if (err) {
                                    console.log('getSKUItemsByRfid error nested:', err);
                                    reject(500);
                                } else {
                                    const skuItems = rows.map((r) => (
                                        {
                                            RFID: r.RFID, // was rfid
                                            SKUId: r.SKUID,
                                            Available: r.AVAILABLE,
                                            DateOfStock: r.DATEOFSTOCK
                                        }));
                                    resolve(skuItems[0]);
                                }
                            });
                        } else {
                            // console.log('No SKU Item associated to Rfid');
                            reject(404);
                        }
                    }
                });
            } else {
                //console.log('Not logged in or wrong permission');
                reject(401);
            }

        });
    }

    modifySKUItem(data) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const checkRfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID= ?';
                let exists = 0;
                this.#db.all(checkRfid, [data.oldRfid], (err, res) => {
                    if (err) {
                        console.log('modifySKUItem error:', err);
                        reject(503);
                    } else {
                        res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                        if (exists) {
                            const sql = 'UPDATE SKU_ITEM SET RFID= ?, AVAILABLE = ?, DATEOFSTOCK = ? WHERE RFID = ?';
                            this.#db.run(sql, [data.newRfid, data.newAvailable, data.newDateOfStock, data.oldRfid], (err) => {
                                if (err) {
                                    console.log('modifySKUItem error nested:', err);
                                    reject(503);
                                } else {
                                    resolve(200);
                                }
                            });
                        } else {
                            //console.log('No SKU Item associated to Rfid');
                            reject(404);
                        }
                    }
                });
            } else {
                //console.log('Not logged in or wrong permissions');
                reject(401);
            }
        });
    }

    deleteSKUItembyRfid(rfid) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const sql = 'DELETE FROM SKU_ITEM WHERE RFID = ?';
                this.#db.run(sql, [rfid], (err) => {
                    if (err) {
                        console.log('deleteSKUItembyRfid error:', err);
                        reject(503);
                    } else {
                        resolve(204);
                    }
                });
            } else {
                //console.log('Not logged in or wrong permissions');
                reject(401);
            }
        });
    }
}

module.exports = SKUItemDao;