class SKUDao {
    #db = undefined;

    constructor(dbInstance) {
        this.#db = dbInstance;
    }

    dropSKUTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS SKU';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.id)
            })
        });
    }

    newSKU(sku) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const sql = 'INSERT INTO SKU(DESCRIPTION, WEIGHT, VOLUME, NOTES, PRICE, AVAILABLEQUANTITY) VALUES (?, ?, ?, ?, ?, ?)';
                this.#db.run(sql, [sku.description, sku.weight, sku.volume, sku.notes, sku.price, sku.availableQuantity], (err, rows) => {
                    if (err) {
                        reject(503);
                        return;
                    }
                    resolve(sku);
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
                            description: r.DESCRIPTION,
                            weight: r.WEIGHT,
                            volume: r.VOLUME,
                            notes: r.NOTES,
                            position: r.POSITION,
                            availableQuantity: r.AVAILABLEQUANTITY,
                            price: r.PRICE,
                            testDescriptors: r.TESTDESCRIPTORS
                        }));
                    console.log(skus);
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

                    res[0]['COUNT(*)'] > 0 ? exists = 1 : exists;

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

    modifySKU(sku) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                const checkId = "SELECT * FROM SKU WHERE ID= ?";
                let exists = 0;
                this.#db.all(checkId, [sku.id], (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    res.length > 0 ? exists = 1 : exists;

                    if (exists) {
                        let loggedAndAuthorized = true;
                        if (loggedAndAuthorized) {
                            const sql = 'UPDATE SKU SET DESCRIPTION = ?, WEIGHT= ?, VOLUME= ?, NOTES= ?, AVAILABLEQUANTITY= ?, PRICE= ? WHERE ID = ?';
                            this.#db.run(sql, [sku.newDescription, sku.newWeight, sku.newVolume, sku.newNotes, sku.newAvailableQuantity, sku.newPrice, sku.id], (err) => {
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

    modifySKUPosition(data) {
        return new Promise((resolve, reject) => {
            let loggedAndAuthorized = true;
            if (loggedAndAuthorized) {
                let checkAvailability = 'SELECT COUNT(*) FROM SKU WHERE ID= ?'
                this.#db.all(checkAvailability, [data.id], (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (res.length > 0) {
                        const checkVolumeAndWeight = "SELECT S.VOLUME, S.WEIGHT, P.maxVolume, P.maxWeight, P.occupiedWeight, P.occupiedVolume FROM SKU S, POSITION P WHERE P.positionID= S.POSITION AND P.positionID = ?"
                        let checked = false;
                        this.#db.all(checkVolumeAndWeight, [data.position], (err, rows) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            const res = rows.map((r) => (
                                {
                                    volume : r.VOLUME,
                                    weight: r.WEIGHT,
                                    maxVolume: r.maxVolume,
                                    maxWeight: r.maxWeight,
                                    occupiedVolume: r.occupiedVolume,
                                    occupiedWeight: r.occupiedWeight
                                }
                            ));
                            if ((res.volume <= (res.maxVolume - res.occupiedVolume)) && (res.weight <= (res.maxWeight - res.occupiedWeight)))
                                checked = true;
                            if (checked) {
                                const sql = 'UPDATE SKU SET POSITION = ? WHERE ID = ?';
                                this.#db.run(sql, [data.position, data.id], (err) => {
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
                        });

                    } else {
                        console.log('SKU id does not exists');
                        reject(422);
                    }
                });
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
                const sql = 'DELETE FROM SKU WHERE ID = ?';
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



