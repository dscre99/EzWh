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
                    return;
                }
                resolve('DELETED');
            });
        });
    }

    newTableReturnOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS RETURN_ORDER(ID INTEGER PRIMARY KEY AUTOINCREMENT, RETURNDATE DATETIME, ORDERID INTEGER REFERENCES RESTOCK_ORDER(ID) )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('CREATED');
            });
        });
    }

    getReturnOrders() {
        return new Promise((resolve, reject) => {
            
            let products =[];
            let sql = 'SELECT I.RETURNORDERID, P.SKUID, P.PRICE, I.RFID FROM ITEMLIST I JOIN PRODUCTS P WHERE I.ORDERID=P.ORDERID ';
            this.db.all(sql,(err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                products = rows.map((r) => (
                    {
                        returnorderid: r.RETURNORDERID,
                        //description: r.DESCRIPTION
                        skuid:r.SKUID,
                        price:r.PRICE,
                        rfid:r.RFID,
                    }
                ));
            });
            

            
            sql = 'SELECT * FROM RETURN_ORDER';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if(rows.length===0){
                    resolve(undefined);
                }else{
                    const resOrders = rows.map((r) => (
                        {
                            id: r.ID,
                            returnDate: r.RETURNDATE,
                            products: products.filter(key=>key.returnorderid===r.ID).map((d)=>({
                                SKUId:d.skuid,
                                //description : d.description,
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
                    return;
                }
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
                
            });
        });
    }

    getReturnOrderbyId(data) {
        return new Promise((resolve, reject) => {
            let products =[];
            let sql = 'SELECT P.SKUID, P.PRICE, I.RFID FROM ITEMLIST I JOIN PRODUCTS P WHERE I.ORDERID=P.ORDERID AND RETURNORDERID=? ';
            this.db.all(sql, [data.id],(err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                products = rows.map((r) => (
                    {
                        //description: r.DESCRIPTION
                        skuid:r.SKUID,
                        price:r.PRICE,
                        rfid:r.RFID,
                    }
                ));
            });
            

            
            sql = 'SELECT * FROM RETURN_ORDER WHERE ID=?';
            this.db.all(sql, [data.id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if(rows.length===0){
                    resolve(undefined);
                }else{
                    const resOrders = rows.map((r) => (
                        {
                            id: r.ID,
                            returnDate: r.RETURNDATE,
                            products: products.map((d)=>({
                                SKUId:d.skuid,
                                //description : d.description,
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

    storeReturnOrder(data){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO RETURN_ORDER(RETURNDATE, ORDERID) VALUES (?, ?)';
            this.db.run(sql, [data.returnDate, data.restockOrderId], (err) => {
                if (err) {
                    reject(err);
                    return
                }else{
                    resolve('INSERT');
                }
            });

        });
    }
    

    setReturnItem(data) {
        return new Promise((resolve, reject) => {
            const sql = ' UPDATE ITEMLIST SET RETURNORDERID = (SELECT ID FROM RETURN_ORDER ORDER BY ID DESC LIMIT 1 ) WHERE RFID = ? ';
            this.db.run(sql, [data.RFID], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
}



deleteReturnOrder(data) {
    return new Promise((resolve, reject) => {
        const sql = ' DELETE FROM RETURN_ORDER WHERE ID=? ';
        this.db.run(sql, [data.id], (err) => {
            if (err) {
                reject(err);
                return
            }
            resolve(data.id);
        });
    });
}



}
module.exports = Return_orderDAO;