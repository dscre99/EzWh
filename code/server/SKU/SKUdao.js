class SKUDao {
    #db = undefined;

    constructor(DBinstance) {
        this.#db = DBinstance;
    }

    dropSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS SKU';
            this.#db.run(sql, (err) => {
                if (err) {
                    console.log('dropSKUTable error:', err);
                    reject(500);
                } else {
                    resolve(200);
                }
            })
        });
    }

    newSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS SKU ( "ID"	INTEGER, "DESCRIPTION"	TEXT,"WEIGHT"	INTEGER,"VOLUME"	INTEGER,"NOTES"	TEXT,"POSITION"	TEXT,"AVAILABLEQUANTITY"	INTEGER,"PRICE"	REAL,PRIMARY KEY("ID" AUTOINCREMENT))';
            this.#db.run(sql, (err) => {
                if (err) {
                    console.log('newSKUTable error:', err);
                    reject(500);
                } else {
                    resolve(200);
                }
            });
        });
    }
    

    newSKU(sku) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {

                try {
                    let database = this.#db;
                    // this.#db.serialize(function() {

                        const sql1 = 'CREATE TABLE IF NOT EXISTS SKU ( "ID"	INTEGER, "DESCRIPTION"	TEXT,"WEIGHT"	INTEGER,"VOLUME"	INTEGER,"NOTES"	TEXT,"POSITION"	TEXT,"AVAILABLEQUANTITY"	INTEGER,"PRICE"	REAL,PRIMARY KEY("ID" AUTOINCREMENT))';
                        database.run(sql1, (err1) => {
                            if (err1) {
                                console.log('newSKU error1:', err1);
                                reject(500);
                            } else {
                                const sql2 = 'INSERT INTO SKU(DESCRIPTION, WEIGHT, VOLUME, NOTES, PRICE, AVAILABLEQUANTITY, POSITION) VALUES (?, ?, ?, ?, ?, ?, ?)';
                                database.run(sql2, [sku.description, sku.weight, sku.volume, sku.notes, sku.price, sku.availableQuantity, null], (err2) => {
                                    if (err2) {
                                        console.log('newSKU error2:', err2);
                                        reject(500);
                                    } else {
                                        resolve(201);
                                    }
                                });
                            }
                        });
                    // });
                } catch (error) {
                    reject(503);
                }
            } else {
                //console.log('Not logged in or authorized');
                reject(401);
            }
        });
    }

    getSKUs() {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {

                let database = this.#db;
                // this.#db.serialize(function() {
                    const sql1 = 'CREATE TABLE IF NOT EXISTS SKU ( "ID"	INTEGER, "DESCRIPTION"	TEXT,"WEIGHT"	INTEGER,"VOLUME"	INTEGER,"NOTES"	TEXT,"POSITION"	TEXT,"AVAILABLEQUANTITY"	INTEGER,"PRICE"	REAL,PRIMARY KEY("ID" AUTOINCREMENT))';
                    database.run(sql1, (err1) => {
                        if (err1) {
                            console.log('getSKUs error1:', err1);
                            reject(503);
                        } else {
                            const sql2 = 'SELECT * FROM SKU';
                            database.all(sql2, [], (err2, rows2) => {
                                if (err2) {
                                    console.log('getSKUs error2:', err2);
                                    reject(503);
                                } else {
                                    const skus = rows2.map((r) => (
                                        {
                                            id: r.ID,
                                            description: r.DESCRIPTION,
                                            weight: r.WEIGHT,
                                            volume: r.VOLUME,
                                            notes: r.NOTES,
                                            position: r.POSITION,
                                            availableQuantity: r.AVAILABLEQUANTITY,
                                            price: r.PRICE,
                                            testDescriptors: r.TESTDESCRIPTORS
                                        }
                                    ));
                                    
                                    resolve(skus);
                                }
                            });
                        }
                    });
                // });
                
            } else {
                //console.log("Not logged in or wrong permission");
                reject(401);
            }
        });
    }

    getSKUbyID(id) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const checkSKUId = 'SELECT COUNT(*) FROM SKU WHERE ID= ?';
                let exists = 0;
                this.#db.all(checkSKUId, [id], (err, res) => {
                    if (err) {
                        console.log('getSKUbyID error:', err);
                        reject(500);
                    } else {
                        res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                        if (exists) {
                            const sql = 'SELECT * FROM SKU WHERE ID=?';
                            this.#db.all(sql, [id], (err, rows) => {
                                if (err) {
                                    console.log('getSKUbyID error nested:', err);
                                    reject(500);
                                } else {
                                    const sku = rows.map((r) => (
                                        {
                                            id: r.ID,
                                            description: r.DESCRIPTION,
                                            weight: r.WEIGHT,
                                            volume: r.VOLUME,
                                            notes: r.NOTES,
                                            position: r.POSITION,
                                            availableQuantity: r.AVAILABLEQUANTITY,
                                            price: r.PRICE,
                                            testDescriptors: r.TESTDESCRIPTORS
                                        }
                                    ));
                                    resolve(sku);
                                }
                            });
                        } else {
                            // console.log('No SKU associated to ID');
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

    modifySKU(sku) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {

                const checkId = "SELECT * FROM SKU WHERE ID= ?";
                let exists = 0;
                this.#db.all(checkId, [sku.id], (err, res) => {
                    if (err) {
                        console.log('modifySKU error:', err);
                        reject(503);
                    } else {
                        res.length > 0 ? exists = 1 : exists;

                        if (exists) {
                            const sql = 'UPDATE SKU SET DESCRIPTION = ?, WEIGHT= ?, VOLUME= ?, NOTES= ?, AVAILABLEQUANTITY= ?, PRICE= ? WHERE ID = ?';
                            this.#db.run(sql, [sku.newDescription, sku.newWeight, sku.newVolume, sku.newNotes, sku.newAvailableQuantity, sku.newPrice, sku.id], (err) => {
                                if (err) {
                                    console.log('modifySKU error nested:', err);
                                    reject(503);
                                } else {
                                    resolve(200);
                                }
                            });
                        } else {
                            //console.log('SKU Id does not exist');
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

    modifySKUPosition(data) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                let exists = 0;
                let checkAvailability = 'SELECT COUNT(*) FROM SKU WHERE ID= ?'
                this.#db.all(checkAvailability, [data.id], (err, res) => {
                    if (err) {
                        console.log('modifySKUPosition error:', err);
                        reject(503);
                    } else {
                        res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;
                        if (exists) {
                            let checkPosition = 'SELECT COUNT(*) FROM POSITION WHERE positionID= ?';
                            this.#db.all(checkPosition, [data.position], (err, res2) => {
                                if (err) {
                                    console.log('modifySKUPosition error nested:', err);
                                    reject(503);
                                }
                                let alreadyIn = 0;
                                res2[0]['COUNT(*)'] > 0 ? alreadyIn = true : alreadyIn = false;
                                if (alreadyIn) {
                                    let checkPosInSKU = 'SELECT COUNT(*) FROM SKU WHERE POSITION = ?';
                                    this.#db.all(checkPosInSKU, [data.position], (err, res3) => {
                                        if (err) {
                                            console.log('modifySKUPosition error nested2:', err);
                                            reject(503);
                                        }
                                        let posInSKU = 0;
                                        res3[0]['COUNT(*)'] > 0 ? posInSKU = true : posInSKU = false;
                                        if (!posInSKU) {
                                            const checkVolumeAndWeight = 'SELECT * FROM POSITION P, SKU S WHERE P.positionID=? AND S.ID = ?';
                                            let checked = false;
                                            this.#db.all(checkVolumeAndWeight, [data.position, data.id], (err, rows) => {
                                                if (err) {
                                                    console.log('modifySKUPosition error nested3:', err);
                                                    reject(503);
                                                } else {
                                                    let result = rows[0];
                                                    if ((result.VOLUME <= (result.maxVolume - result.occupiedVolume)) && (result.WEIGHT <= (res.maxWeight - res.occupiedWeight)))
                                                        checked = true;
                                                    if (!checked) {
                                                        const sql = 'UPDATE SKU SET POSITION = ? WHERE ID = ?';
                                                        this.#db.run(sql, [data.position, data.id], (err) => {
                                                            if (err) {
                                                                console.log('modifySKUPosition error nested4:', err);
                                                                reject(503);
                                                            } else {
                                                                let occVolume = res.occupiedVolume + res.volume;
                                                                let occWeight = res.occupiedWeight + res.weight;
                                                                const modifyPositionTable = 'UPDATE POSITION SET occupiedWeight= ?, occupiedVolume= ? WHERE positionID= ?'
                                                                this.#db.run(modifyPositionTable, [occWeight, occVolume, data.position], (err) => {
                                                                    if (err) {
                                                                        console.log('modifySKUPosition error nested5:', err);
                                                                        reject(503);
                                                                    } else {
                                                                        resolve(200);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        //console.log('Position not capable of satisfying volume and weight constraints');
                                                        reject(422);
                                                    }
                                                }
                                            });

                                        } else {
                                            //console.log('Position already assigned to a sku');
                                            reject(422);
                                        }
                                    });

                                } else {
                                    // console.log('PositionID does not exist');
                                    // console.log('Error', err);
                                    reject(422);
                                }
                            });
                        } else {
                            // console.log('SKU id does not exists');
                            reject(422);
                        }
                    }
                });
            } else {
                //console.log('Not logged in or wrong permission');
                reject(401);
            }
        });
    }

    deleteSKUbyID(id) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const sql = 'DELETE FROM SKU WHERE ID = ?';
                this.#db.run(sql, [id], (err) => {
                    if (err) {
                        console.log('deleteSKUbyID error:', err);
                        reject(503);
                    } else {
                        resolve(204);
                    }
                });
            } else {
                //console.log('Not logged in or wrong permission');
                reject(401);
            }
        });
    }


}

module.exports = SKUDao;



