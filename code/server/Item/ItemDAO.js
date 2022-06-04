class ItemDAO {
    db= undefined;
    constructor(db) {
        this.db=db;
    }

    dropTableItem() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS ITEM';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(500);
                }else{
                    resolve(200);
                }
            });
        });
    }

    newTableItem() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS ITEM(ID INTEGER, DESCRIPTION VARCHAR, PRICE REAL, SKUID INTEGER REFERENCES SKUS(ID), SUPPLIERID INTEGER REFERENCES USER(ID), PRIMARY KEY(ID) )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(500);
                }else{
                    resolve(200);
                }
            });
        });
    }

    getItems(){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ID,DESCRIPTION,PRICE,SKUID,SUPPLIERID FROM ITEM ';
            this.db.all(sql, (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    const products = rows.map((r) => ({
                        id:r.ID,
                        description:r.DESCRIPTION,
                        price:r.PRICE,
                        SKUId:r.SKUID,
                        supplierId:r.SUPPLIERID
                    }));
                    resolve(products);
                }
            });
        });
    }

    getItemByID(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ID, DESCRIPTION, PRICE, SKUID, SUPPLIERID FROM ITEM WHERE ID=? ';
            this.db.all(sql, [data.id], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    if(rows.length===0){
                        resolve(undefined);
                    }else{
                        const products = rows.map((r) => (
                            {
                                id:r.ID,
                                description:r.DESCRIPTION,
                                price:r.PRICE,
                                SKUId:r.SKUID,
                                supplierId:r.SUPPLIERID
                            }
                        ));
                        resolve(products[0]);
                    }
                }
            });
        });
    }

    getSKUIDbyItemID(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ID FROM ITEM WHERE SKUID=? AND SUPPLIERID=? ';
            this.db.all(sql, [data.SKUId,data.supplierId], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    if(rows.length===0){
                        resolve(undefined);
                    }else{
                        const products = rows.map((r) => (
                            {
                                id:r.ID,
                            }
                        ));
                        resolve(products[0]);
                    }
                }
            });
        });
    }

    getSKUID(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ID FROM SKU WHERE ID=? ';
            this.db.all(sql, [data.SKUId], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    if(rows.length===0){
                        resolve(undefined);
                    }else{
                        const products = rows.map((r) => (
                            {
                                id:r.ID,
                            }
                        ));
                        resolve(products[0]);
                    }
                }
            });
        });
    }

    getItembyIdSupp(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ID FROM ITEM WHERE ID=? AND SUPPLIERID=? ';
            this.db.all(sql, [data.id,data.supplierId], (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    if(rows.length===0){
                        resolve(undefined);
                    }else{
                        const products = rows.map((r) => (
                            {
                                id:r.ID,
                            }
                        ));
                        resolve(products[0]);
                    }
                }
            });
        });
    }

    storeItem(data) {
        return new Promise( async (resolve, reject) => {
            
                    const sql = ' INSERT INTO ITEM (ID,DESCRIPTION, PRICE, SKUID, SUPPLIERID) VALUES (?,?,?,?,?) ';
                      this.db.run(sql, [data.id,data.description,data.price,data.SKUId,data.supplierId], (err) => {
                        if (err) {
                            reject(503);
                        } else {
                            resolve(201);
                        }
                    });
        });
    }

    updateItem(data,params) {
        return new Promise((resolve, reject) => {
            const sql = ' UPDATE ITEM SET DESCRIPTION = ? , PRICE = ? WHERE ID=? ';
            this.db.run(sql, [data.newDescription, data.newPrice, params.id], (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(200);
                }
            });
        });
    }

    deleteItem(data) {
        return new Promise((resolve, reject) => {
            const sql = ' DELETE FROM ITEM WHERE ID=? ';
            this.db.run(sql, [data.id], (err) => {
                if (err) {
                    reject(503);
                }else{
                    resolve(204);
                }
            });
        });
    }
}

module.exports = ItemDAO;