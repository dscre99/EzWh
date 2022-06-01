class Return_orderDAO{
    db= undefined;

    constructor(db) {
        this.db=db;
        
    }

    // RETURN ORDER TABLE
    dropTableReturnOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS RETURN_ORDER';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(200);
                }
            });
        });
    }

    newTableReturnOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS RETURN_ORDER(ID INTEGER PRIMARY KEY AUTOINCREMENT, RETURNDATE DATETIME, ORDERID INTEGER REFERENCES RESTOCK_ORDER(ID) )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(200);
                }
            });
        });
    }

    dropTableItemReturn() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS SKUITEM_IN_RETURNORDER';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(200);
                }
            });
        });
    }

    newTableItemReturn() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS SKUITEM_IN_RETURNORDER(RFID VARCHAR REFERENCES SKU_ITEM(RFID),RETURNORDERID INTEGER REFERENCES RETURN_ORDER(ID), DESCRIPTION VARCHAR, PRICE DOUBLE,SKUID INTEGER, PRIMARY KEY(RFID,RETURNORDERID) )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(200);
                }
            });
        });
    }

    getReturnOrders() {
        return new Promise((resolve, reject) => {
            
            let products =[];
            let sql = 'SELECT RETURNORDERID, DESCRIPTION, SKUID, PRICE, RFID FROM SKUITEM_IN_RETURNORDER';
            this.db.all(sql,(err, rows) => {
                if (err) {
                    reject(err);
                }else{
                    products = rows.map((r) => (
                        {
                            returnorderid: r.RETURNORDERID,
                            description: r.DESCRIPTION,
                            skuid:r.SKUID,
                            price:r.PRICE,
                            rfid:r.RFID,
                        }
                    ));
                }
                // console.log(products);
            });
            
            sql = 'SELECT * FROM RETURN_ORDER';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }else{
                    const resOrders = rows.map((r) => (
                        {
                            id: r.ID,
                            returnDate: r.RETURNDATE,
                            products: products.filter(key=>key.returnorderid===r.ID).map((d)=>({
                                SKUId:d.skuid,
                                description : d.description,
                                price: d.price,
                                RFID: d.rfid
                            })),
                            restockOrderId: r.ORDERID,
                        }
                    ));
                    resolve(resOrders);
                }
            });
        });
    }

    getRestockOrderbyID(data) {
        return new Promise((resolve, reject) => {
            
           const sql = 'SELECT ID FROM RESTOCK_ORDER WHERE ID = ? ';
            this.db.all(sql, [data.restockOrderId], (err, rows) => {
                if (err) {
                    reject(err);
                }else{
                    if(rows.length==0){
                        resolve(undefined);
                    }else{
                        const resOrders = rows.map((r) => (
                            {
                                id: r.ID
                            }
                        ));
                        resolve(resOrders);
                    }
                }
            });
        });
    }

    getReturnOrderbyId(data) {
        return new Promise((resolve, reject) => {
            let products =[];
            let sql = 'SELECT RETURNORDERID, DESCRIPTION, SKUID, PRICE, RFID FROM SKUITEM_IN_RETURNORDER';
            this.db.all(sql,(err, rows) => {
                if (err) {
                    reject(err);
                }else{
                    products = rows.map((r) => (
                        {
                            returnorderid: r.RETURNORDERID,
                            description: r.DESCRIPTION,
                            skuid:r.SKUID,
                            price:r.PRICE,
                            rfid:r.RFID,
                        }
                    ));
                }
                // console.log(products);
            });
            

            sql = 'SELECT * FROM RETURN_ORDER WHERE ID=?';
            this.db.all(sql, [data.id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                if(rows.length===0){
                    resolve(404);
                }else{
                    const resOrders = rows.map((r) => (
                        {
                            id: r.ID,
                            returnDate: r.RETURNDATE,
                            products: products.filter(key=>key.returnorderid===r.ID).map((d)=>({
                                SKUId:d.skuid,
                                description : d.description,
                                price: d.price,
                                RFID: d.rfid
                            })),
                            restockOrderId: r.ORDERID,
                        }
                    ));
                    resolve(resOrders[0]);

                }

            });
        });
    }

    storeReturnOrder(data){
        return new Promise(async (resolve, reject) => {
            const sql = 'INSERT INTO RETURN_ORDER(RETURNDATE, ORDERID) VALUES (?, ?)';
            await this.db.run(sql, [data.returnDate, data.restockOrderId], (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(201);
                }
            });

        });
    }
    

    setReturnItem(data) {
        return new Promise(async (resolve, reject) => {
            const sql = 'INSERT INTO SKUITEM_IN_RETURNORDER(RFID,RETURNORDERID,DESCRIPTION,PRICE,SKUID) VALUES(?, (SELECT ID FROM RETURN_ORDER ORDER BY ID DESC LIMIT 1) ,?,?,?)';
           await this.db.run(sql, [data.RFID,data.description,data.price,data.SKUId], (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(201);
                }
            });
        });
}



deleteReturnOrder(data) {
    return new Promise((resolve, reject) => {
        const sql = ' DELETE FROM RETURN_ORDER WHERE ID=? ';
        this.db.run(sql, [data.id], (err) => {
            if (err) {
                reject(err);
            }
            resolve(204);
        });
    });
}



}
module.exports = Return_orderDAO;