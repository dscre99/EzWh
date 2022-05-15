class SKUDao {
    #db = undefined;

    constructor(dbInstance) {
        this.#db = dbInstance;
    }

    /*dropSKUTable() {
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
    }*/

    newSKU(sku) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const sql = 'INSERT INTO SKU(DESCRIPTION, WEIGHT, VOLUME, NOTES, POSITION, AVAILABLEQUANTITY, PRICE) VALUES (?, ?, ?, ?, ?, ?, ?)';
                this.#db.run(sql, [sku.description, sku.weight, sku.volume, sku.notes, sku.position, sku.availableQuantity, sku.price], (err, rows) => {
                    if (err) {
                        reject(503);
                        return;
                    }
                    resolve(sku.get);
                });
            } else {
                console.log('Not logged in or authorized');
                reject(401);
            }
        });
    }

    getSKUs() {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const sql = 'SELECT * FROM SKU';
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
            } else {
                console.log("Not logged in or wrong permission");
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
                        reject(err);
                        return;
                    }

                    res[0]['COUNT(*)'] > 0 ? exists = 1 : exist;

                    if (exists) {
                        const sql = 'SELECT * FROM SKU WHERE ID=?';
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
                    } else {
                        console.log('No SKU associated to ID');
                        reject(404);
                    }
                });
            } else {
                console.log('Not logged in or wrong permissions');
                reject(401);
            }
        });
    }

    modifySKU(id) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const checkId = "SELECT * FROM USERS WHERE ID= ?";
                let exists = 0;
                this.#db.all(checkId, [id], (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

                    if (exists) {
                        let loggedAndAuthorized = true;
                        if (loggedAndAuthorized) {
                            const sql = 'UPDATE SKU SET description = ? ,weight= ?,volume= ?,notes= ?,availablequantity= ?,price= ? WHERE id = ?';
                            this.#db.run(sql, [sku.newDescription, sku.newWeight, sku.newVolume, sku.newNotes, sku.newAvailableQuantity, sku.newPrice, id], (err) => {
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

                    } else {
                        console.log('SKU Id does not exist');
                        reject(404);
                    }
                });
            } else {
                console.log('Not logged in or wrong permissions');
                reject(401);
            }

        });
    }

    modifySKUPosition(position) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                let checkAvailability = 'SELECT COUNT(*) FROM SKU WHERE POSITION= ?'
                if (checkAvailability != 0) {
                    console.log('Position already assigned to a sku');
                    reject(422);
                } else {
                    const checkVolumeAndWeight = "SELECT S.VOLUME, S.WEIGHT, P.MAXVOLUME, P.MAXWEIGHT, P.OCCUPIEDWEIGHT, P.OCCUPIEDVOLUME FROM SKU S, POSITION P WHERE POSITION = ?"
                    let checked = false;
                    this.#db.get(checkVolumeAndWeight, [position], (err, row) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if ((row.volume <= (row.maxVolume - row.occupiedVolume)) && (row.weight <= (row.maxWeight - row.occupiedWeight)))
                            checked = true;
                    });
                    if (checked) {
                        const sql = 'UPDATE SKU SET position = ? WHERE id = ?';
                        this.#db.run(sql, [position], (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(true);
                            }
                        });
                    } else {
                        console.log('Position not capable of satisfying volume and weight constraints');
                        reject(422);
                    }
                }
            } else {
                console.log('Not logged in or wrong permission');
                reject(401);
            }
        });
    }

    deleteSKUbyID(id) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const sql = 'DELETE FROM SKU WHERE id = ?';
                this.#db.run(sql, [id], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                console.log('Not logged in or wrong permission');
                reject(401);
            }
        });
    }


}

module.exports = SKUDao;



