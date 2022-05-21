class Restock_orderDAO{
    db= undefined;
    constructor(db) {
        this.db=db;
    }

    // RESTOCK ORDER TABLE
    dropTableRestockOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'DROP TABLE IF EXISTS RESTOCK_ORDER';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200);
            });
        });
    }

    newTableRestockOrder() {
        return new Promise((resolve, reject)  => {
            const sql = 'CREATE TABLE IF NOT EXISTS RESTOCK_ORDER(ID INTEGER PRIMARY KEY AUTOINCREMENT, ISSUEDATE DATETIME, STATE VARCHAR, SUPPLIERID INTEGER REFERENCES SUPPLIER(ID), TRANSPORTNOTE DATE  )';
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200);
            });
        });
    }

        // PRODUCTS TABLE (N-N WITH SKU)
        dropTableProducts() {
            return new Promise((resolve, reject)  => {
                const sql = 'DROP TABLE IF EXISTS PRODUCTS';
                this.db.run(sql, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(200);
                });
            });
        }
    
        newTableProducts() {
            return new Promise((resolve, reject)  => {
                const sql = 'CREATE TABLE IF NOT EXISTS PRODUCTS(SKUID INTEGER REFERENCES SKU(ID),ORDERID INTEGER REFERENCES RESTOCK_ORDER(ID), QUANTITY INTEGER, PRICE FLOAT, DESCRIPTION VARCHAR, PRIMARY KEY(SKUID,ORDERID))';
                this.db.run(sql, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(200);
                });
            });
        }

        // SKUITEM_IN_RESTOCKORDER TABLE (N-N WITH SKUITEM)
        dropTableItemlist() {
            return new Promise((resolve, reject)  => {
                const sql = 'DROP TABLE IF EXISTS SKUITEM_IN_RESTOCKORDER';
                this.db.run(sql, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(200);
                });
            });
        }
    
        newTableItemlist() {
            return new Promise((resolve, reject)  => {
                const sql = 'CREATE TABLE IF NOT EXISTS SKUITEM_IN_RESTOCKORDER(RFID VARCHAR REFERENCES SKU_ITEM(RFID),ORDERID INTEGER REFERENCES RESTOCK_ORDER(ID),RETURNORDERID INTEGER REFERENCES RETURN_ORDER(ID), PRIMARY KEY(RFID,ORDERID))';
                this.db.run(sql, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(200);
                });
            });
        }

    // GETTERS

    getItemList(data){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT I.RFID, S.SKUID FROM SKUITEM_IN_RESTOCKORDER I JOIN SKU_ITEM S WHERE I.RFID=S.RFID AND I.ORDERID=?';
            this.db.all(sql, [data.id||data.ID], (err, rows) => {
                if(err){
                    reject(err);
                }
                    const products = rows.map((r) => (
                        {
                            SKUId: r.SKUID,
                            rfid: r.RFID
                        }
                    ));
                    resolve(products);
            });
        });
    }

    checkItemList(data,param){
        return new Promise((resolve, reject) => {
            const sql = 'SELECT ORDERID FROM SKUITEM_IN_RESTOCKORDER WHERE ORDERID=? AND RFID=?';
            this.db.all(sql, [data.id,param.rfid], (err, rows) => {
                if(err){
                    reject(err);
                }
                if(rows.length==0){
                    resolve(undefined);
                }else{
                    const products = rows.map((r) => (
                        {
                            id:r.ORDERID
                        }
                    ));
                    resolve(products);
                }
                
            });
        });
    }

    getRestockOrders() {
        return new Promise((resolve, reject) => {
            let products =[];
            let sql = 'SELECT P.ORDERID, P.SKUID, P.DESCRIPTION, P.PRICE, P.QUANTITY FROM PRODUCTS P';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                products = rows.map((r) => (
                    {
                        orderid:r.ORDERID,
                        id:r.SKUID,
                        description:r.DESCRIPTION,
                        price:r.PRICE,
                        quantity:r.QUANTITY,
                    }
                ));
            });
            let items = [];
            sql = 'SELECT I.ORDERID, I.RFID, S.SKUID FROM SKUITEM_IN_RESTOCKORDER I JOIN SKU_ITEM S WHERE I.RFID=S.RFID';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                items = rows.map((r) => (
                    {
                        orderid:r.ORDERID,
                        SKUId: r.SKUID,
                        rfid: r.RFID
                    }
                ));
            });
            sql = 'SELECT * FROM RESTOCK_ORDER ';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                const resOrders = rows.map((r) => (
                    {
                        id: r.ID,
                        issueDate: r.ISSUEDATE,
                        state: r.STATE,
                        products: products.filter(val=>val.orderid===r.ID).map((d)=>({
                            SKUId:d.id,
                            description : d.description,
                            price: d.price,
                            qty: d.quantity
                        })),
                        supplierId: r.SUPPLIERID,
                        transportNote: r.STATE!=='ISSUED'? r.TRANSPORTNOTE:{},
                        skuItems: r.state!=='ISSUED'||r.state!=='DELIVERY'? items.filter(key=>key.orderid===r.ID).map((d)=>({
                            SKUId: d.SKUId,
                            rfid: d.rfid
                        })):[]
                    }
                ));
                resolve(resOrders);
            });
        });
    }

    getRestockOrdersIssued() {
        return new Promise((resolve, reject) => {
            let products =[];
            let sql = 'SELECT P.ORDERID, P.SKUID, P.DESCRIPTION, P.PRICE, P.QUANTITY FROM PRODUCTS P';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                products = rows.map((r) => (
                    {
                        orderid:r.ORDERID,
                        id:r.SKUID,
                        description:r.DESCRIPTION,
                        price:r.PRICE,
                        quantity:r.QUANTITY,
                    }
                ));
            });
            

            sql = 'SELECT * FROM RESTOCK_ORDER WHERE STATE="ISSUED" ';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                const resOrders = rows.map((r) => (
                    {
                        id: r.ID,
                        issueDate: r.ISSUEDATE,
                        state: r.STATE,
                        products: products.filter(val=>val.orderid===r.ID).map((d)=>({
                            SKUId:d.id,
                            description : d.description,
                            price: d.price,
                            qty: d.quantity
                        })),
                        supplierId: r.SUPPLIERID,
                        skuItems: []
                    }
                ));
                resolve(resOrders);
            });
        });
    }


    getRestockOrderByID(data) {
        return new Promise((resolve, reject) => {
            let products =[];
            let sql = 'SELECT P.ORDERID, P.SKUID, P.DESCRIPTION, P.PRICE, P.QUANTITY FROM PRODUCTS P  ';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                products = rows.map((r) => (
                    {
                        orderid:r.ORDERID,
                        id:r.SKUID,
                        description:r.DESCRIPTION,
                        price:r.PRICE,
                        quantity:r.QUANTITY,
                    }
                ));
            });
            let items = [];
            sql = 'SELECT I.ORDERID, I.RFID, S.SKUID FROM SKUITEM_IN_RESTOCKORDER I JOIN SKU_ITEM S WHERE I.RFID=S.RFID';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                items = rows.map((r) => (
                    {
                        orderid:r.ORDERID,
                        SKUId: r.SKUID,
                        rfid: r.RFID
                    }
                ));
            });

            sql = 'SELECT * FROM RESTOCK_ORDER WHERE ID= ? ';
            this.db.all(sql, [data.id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                if(rows.length==0){
                    resolve(undefined);
                }else{
                    const resOrder = rows.map((r) => (
                        {
                            id: r.ID,
                            issueDate: r.ISSUEDATE,
                            state: r.STATE,
                            products: products.filter(val=>val.orderid===r.ID).map((d)=>({
                                SKUId:d.id,
                                description : d.description,
                                price: d.price,
                                qty: d.quantity
                            })),
                            supplierId: r.SUPPLIERID,
                            transportNote: r.STATE!=='ISSUED'? r.TRANSPORTNOTE:{},
                            skuItems: r.state!=='ISSUED'||r.state!=='DELIVERY'? items.filter(key=>key.orderid===r.ID).map((d)=>({
                                SKUId: d.SKUId,
                                rfid: d.rfid
                            })):[]
                        }
                    ));
                    resolve(resOrder);
                }
                
            });
        });
    }

    getRestockOrderDeliveredByID(data) {
        return new Promise((resolve, reject) => {
            let products =[];
            let sql = 'SELECT P.ORDERID, P.SKUID, P.DESCRIPTION, P.PRICE, P.QUANTITY FROM PRODUCTS P ';
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                }
                products = rows.map((r) => (
                    {
                        orderid:r.ORDERID,
                        id:r.SKUID,
                        description:r.DESCRIPTION,
                        price:r.PRICE,
                        quantity:r.QUANTITY,
                    }
                ));
            });

         sql = 'SELECT * FROM RESTOCK_ORDER WHERE ID= ? AND STATE="DELIVERED" ';
            this.db.all(sql, [data.id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                if(rows.length==0){
                    resolve(undefined);
                }else{
                    const resOrder = rows.map((r) => (
                        {
                            id: r.ID,
                            issueDate: r.ISSUEDATE,
                            state: r.STATE,
                            products: products.filter(val=>val.orderid===r.ID).map((d)=>({
                                SKUId:d.id,
                                description : d.description,
                                price: d.price,
                                qty: d.quantity
                            })),
                            supplierId: r.SUPPLIERID,
                            transportNote: r.TRANSPORTNOTE,
                            skuItems :[]
                        }
                    ));
                    resolve(resOrder);
                }
                
            });
        });
    }

    //POST

    storeRestockOrder(data){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO RESTOCK_ORDER(ISSUEDATE, STATE, SUPPLIERID) VALUES (?, "ISSUED", ?)';
            this.db.run(sql, [data.issueDate, data.supplierId], (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve(201);
                }
            });

            
        });
    }


    storeProducts(data){
        
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO PRODUCTS(SKUID, ORDERID, QUANTITY,PRICE,DESCRIPTION) VALUES (?, (SELECT ID FROM RESTOCK_ORDER ORDER BY ID DESC LIMIT 1),?,?,?)';
            this.db.run(sql, [data.SKUId, data.qty, data.price, data.description], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(201);
            });
        });
    }
 

    // PUT

    updateState(data,params) {
        return new Promise((resolve, reject) => {
            const sql = ' UPDATE RESTOCK_ORDER SET STATE= ? WHERE ID=? ';
            this.db.run(sql, [data.newState, params.id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200);
            });
        });
    }



    newSKUItemList(data,params) {
            return new Promise((resolve, reject) => {
                const sql = ' INSERT INTO SKUITEM_IN_RESTOCKORDER (ORDERID,RFID) VALUES (?,?) ';
                this.db.run(sql, [params.id, data.rfid], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(200);
                });
            });
    }

    addTransportNote(data,params) {
        return new Promise((resolve, reject) => {
            const sql1= 'SELECT * FROM RESTOCK_ORDER WHERE ID=? AND ISSUEDATE<=? AND STATE= "DELIVERED" ';
            this.db.all(sql1,[params.id,data.deliveryDate],(err,rows)=>{
                if(err){
                    reject(err);
                }
                if(rows.length===0){
                    resolve(422);
                }else{
                    const sql = ' UPDATE RESTOCK_ORDER  SET TRANSPORTNOTE= ? WHERE ID=? ';
                    this.db.run(sql, [data.deliveryDate, params.id], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(200);
                    });
                }
            })
        });
    }

    //DELETE 
    deleteRestockOrder(data) {
        return new Promise((resolve, reject) => {
            const sql = ' DELETE FROM RESTOCK_ORDER WHERE ID=? ';
            this.db.run(sql, [data.id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(204);
            });
        });
    }
}

module.exports = Restock_orderDAO;