

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
                    reject(err);
                }
                resolve(200)
            })
        });
    }

    newSKUItemTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE "SKU_ITEM" ("RFID"	TEXT,"SKUID"	INTEGER,"AVAILABLE"	INTEGER,"DATEOFSTOCK" TEXT, PRIMARY KEY("RFID"))';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
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
                        reject(err);
                    }

                    //res.length > 0 ? exists = 1 : exists;
                    res[0]['COUNT(*)'] > 0 ? exists=1 : exists
                    if (exists) {
                        const sql = 'INSERT INTO SKU_ITEM(RFID, SKUID, AVAILABLE, DATEOFSTOCK) VALUES (?, ?, ?, ?)';
                        this.#db.run(sql, [skuItem.RFID, skuItem.SKUId, 0, skuItem.DateOfStock], (err, rows) => {
                            
                            if (err) {
                                reject(503);
                            }
                            resolve(201);
                        });
                    } else {
                        //console.log('No SKU associated to SKUID');
                        reject(404);
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
                const sql = 'SELECT * FROM SKU_ITEM';
                this.#db.all(sql, [], (err, rows) => {
                    if(err){
                        reject(503);
                    }
                    const skuItems = rows.map((r) => (
                        {
                            RFID: r.RFID, //was rfid 
                            SKUId: r.SKUID,
                            Available: r.AVAILABLE,
                            DateOfStock: r.DATEOFSTOCK
                        }
                    ))
                    resolve(skuItems);   
                }) 
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
                        reject(err);
                    }

                    res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                    if (exists) {
                        const sql = 'SELECT * FROM SKU_ITEM WHERE SKUID= ? AND AVAILABLE=1';
                        this.#db.all(sql, [SKUId
                        ], (err, rows) => {
                            if (err) {
                                reject(err);
                            }
                            const skuItems = rows.map((r) => (
                                {
                                    RFID: r.RFID, //was rfid 
                                    SKUId: r.SKUID,
                                    Available: r.AVAILABLE,
                                    DateOfStock: r.DATEOFSTOCK
                                }));
                            resolve(skuItems);
                        });
                    } else {
                        // console.log('No sku associated to ID');
                        reject(404);
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
                        reject(err);
                    }

                    res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                    if (exists) {
                        const sql = 'SELECT * FROM SKU_ITEM WHERE RFID = ?';
                        this.#db.all(sql, [rfid], (err, rows) => {
                            if (err) {
                                reject(err);
                            }
                            const skuItems = rows.map((r) => (
                                {
                                    RFID: r.RFID, // was rfid
                                    SKUId: r.SKUID,
                                    Available: r.AVAILABLE,
                                    DateOfStock: r.DATEOFSTOCK
                                }));
                            resolve(skuItems[0]);
                        });
                    } else {
                        // console.log('No SKU Item associated to Rfid');
                        reject(404);
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
                        reject(err);
                    }

                    res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                    if (exists) {
                        const sql = 'UPDATE SKU_ITEM SET RFID= ?, AVAILABLE = ?, DATEOFSTOCK = ? WHERE RFID = ?';
                        this.#db.run(sql, [data.newRfid, data.newAvailable, data.newDateOfStock, data.oldRfid], (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(200);
                            }
                        });
                    } else {
                        //console.log('No SKU Item associated to Rfid');
                        reject(404);
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
                        reject(err);
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