import "EZWH_db.js"

class SKUDao {

    newSKUTable() {
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
}


