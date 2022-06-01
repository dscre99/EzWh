class InternalOrderDAO {
    db = undefined;

    constructor(dbInstance) {
        this.db = dbInstance;
    }

    clearInternalOrdersTable() {
        return new Promise((resolve, reject) => {

            let sql1 = 'DROP TABLE IF EXISTS INTERNAL_ORDER';
            this.db.run(sql1, (err1) => {
                if(err1){
                    // reports error while querying database
                    console.log('clearInternalOrdersTable() sql1.run error:: ', err1);
                    reject(500);    // 500 Internal Server Error (generic error)

                } else {

                    let sql2 = `CREATE TABLE IF NOT EXISTS INTERNAL_ORDER(
                                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                    ISSUE_DATE VARCHAR,
                                    STATE VARCHAR,
                                    CUSTOMER_ID INTEGER
                                )`;
                    this.db.run(sql2, (err2) => {
                        if(err2){
                            // reports error while querying database
                            console.log('clearInternalOrdersTable() sql2.run error:: ', err2);
                            reject(500);    // 500 Internal Server Error (generic error)
        
                        } else {
                            resolve(200);
        
                        }
                    });
                }
            });
        });
    }

    clearSKUinInternalOrdersTable() {
        return new Promise((resolve, reject) => {

            let sql1 = 'DROP TABLE IF EXISTS SKU_IN_INTERNALORDER';
            this.db.run(sql1, (err1) => {
                if(err1){
                    // reports error while querying database
                    console.log('clearSKUinInternalOrdersTable() sql1.run error:: ', err1);
                    reject(500);    // 500 Internal Server Error (generic error)

                } else {

                    // let sql2 = `CREATE TABLE IF NOT EXISTS SKU_IN_INTERNALORDER(
                    //                 INTERNAL_ORDER_ID INTEGER NOT NULL,
                    //                 SKU_ID INTEGER NOT NULL,
                    //                 DESCRIPTION VARCHAR,
                    //                 PRICE FLOAT,
                    //                 QTY INTEGER,
                    //                 PRIMARY KEY (INTERNAL_ORDER_ID, SKU_ID),
                    //                 FOREIGN KEY (INTERNAL_ORDER_ID) REFERENCES INTERNAL_ORDER(ID)
                    //             )`;
                    let sql2 = `CREATE TABLE IF NOT EXISTS SKU_IN_INTERNALORDER(
                        INTERNAL_ORDER_ID INTEGER NOT NULL,
                        SKU_ID INTEGER NOT NULL,
                        DESCRIPTION VARCHAR,
                        PRICE FLOAT,
                        QTY INTEGER,
                        PRIMARY KEY (INTERNAL_ORDER_ID, SKU_ID),
                        FOREIGN KEY (INTERNAL_ORDER_ID) REFERENCES INTERNAL_ORDER(ID)
                    )`;
                    this.db.run(sql2, (err2) => {
                        if(err2){
                            // reports error while querying database
                            console.log('clearSKUinInternalOrdersTable() sql2.run error:: ', err2);
                            reject(500);    // 500 Internal Server Error (generic error)
        
                        } else {
                            resolve(200);
        
                        }
                    });
                }
            });
        });
    }

    clearSKUITEMinInternalOrdersTable() {
        return new Promise((resolve, reject) => {

            let sql1 = 'DROP TABLE IF EXISTS SKUITEM_IN_INTERNALORDER';
            this.db.run(sql1, (err1) => {
                if(err1){
                    // reports error while querying database
                    console.log('clearSKUITEMinInternalOrdersTable() sql1.run error:: ', err1);
                    reject(500);    // 500 Internal Server Error (generic error)

                } else {

                    let sql2 = `CREATE TABLE IF NOT EXISTS SKUITEM_IN_INTERNALORDER(
                                    INTERNAL_ORDER_ID INTEGER NOT NULL,
                                    SKU_ID INTEGER NOT NULL,
                                    RFID VARCHAR,
                                    PRIMARY KEY (INTERNAL_ORDER_ID, SKU_ID, RFID),
                                    FOREIGN KEY (INTERNAL_ORDER_ID) REFERENCES INTERNAL_ORDER(ID)
                                )`;
                    this.db.run(sql2, (err2) => {
                        if(err2){
                            // reports error while querying database
                            console.log('clearSKUITEMinInternalOrdersTable() sql2.run error:: ', err2);
                            reject(500);    // 500 Internal Server Error (generic error)
        
                        } else {
                            resolve(200);
        
                        }
                    });
                }
            });
        });
    }
    
    getInternalOrders() {

        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT * FROM INTERNAL_ORDER';
                this.db.all(sql1, (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('getInternalOrders() sql1.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
    
                    } else {

                        //let internalOrders = [];
                        const internalOrders = rows.map((r) => (
                            {
                                id:r.ID,
                                issueDate:r.ISSUE_DATE,
                                state:r.STATE,
                                customerId:r.CUSTOMER_ID
                            }
                        ));

                        let sql2 = 'SELECT * FROM SKU_IN_INTERNALORDER';
                        this.db.all(sql2, (err2, rows2) => {
                            if(err2){
                                // reports error while querying database
                                console.log('getInternalOrders() sql2.run error:: ', err2);
                                reject(500);    // 500 Internal Server Error (generic error)
            
                            } else {
                                const SKUSperOrder = rows2.map((r2) => (
                                    {
                                        orderID:r2.INTERNAL_ORDER_ID,
                                        SKUID:r2.SKU_ID,
                                        description:r2.DESCRIPTION,
                                        price:r2.PRICE,
                                        qty:r2.QTY
                                    }
                                ));

                                for (let i = 0; i < internalOrders.length; i++) {
                                    internalOrders[i]['products'] = [];

                                    for (let j = 0; j < SKUSperOrder.length; j++) {
                                        if(internalOrders[i].id == SKUSperOrder[j].orderID) {

                                            if(internalOrders[i].state != 'COMPLETED') {
                                                internalOrders[i]['products'].push([SKUSperOrder[j]].map((spo) => ({
                                                    SKUId:spo.SKUID,
                                                    description:spo.description,
                                                    price:spo.price,
                                                    qty:spo.qty
                                                }))[0]);
                                            }                                       
                                            
                                        }
                                        
                                    }
                                }

                                let sql3 = 'SELECT * FROM SKUITEM_IN_INTERNALORDER';
                                this.db.all(sql3, (err3, rows3) => {
                                    if(err3){
                                        // reports error while querying database
                                        console.log('getInternalOrders() sql3.run error:: ', err3);
                                        reject(500);    // 500 Internal Server Error (generic error)
                    
                                    } else {
                                        const SKUItems = rows3.map((r3 => (
                                            {
                                                orderID:r3.INTERNAL_ORDER_ID,
                                                SKUID:r3.SKU_ID,
                                                RFID:r3.RFID
                                            }
                                        )));

                                        for (let i = 0, inserted = 0; i < internalOrders.length; i++) {
                                            if(internalOrders[i].state == 'COMPLETED'){
                                                for (let j = 0; j < SKUItems.length; j++) {
                                                    if(SKUItems[j].orderID == internalOrders[i].id){
                                                        for (let k = 0; k < SKUSperOrder.length; k++) {
                                                            if(SKUItems[j].SKUID == SKUSperOrder[k].SKUID){
                                                                internalOrders[i]['products'].push([SKUSperOrder[k]].map((spo) => (
                                                                    {
                                                                        SKUId:spo.SKUID,
                                                                        description:spo.description,
                                                                        price:spo.price,
                                                                        qty:spo.qty
                                                                    }
                                                                ))[0]);
                                                                internalOrders[i]['products'][inserted]['RFID'] = SKUItems[j].RFID;
                                                                inserted = inserted+1;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        resolve(internalOrders); 
                    
                                    }
                                });
                            }
                        });
                    }                    
                });
                
            } else {
                reject(401);    // 401 Unauthorized
            }
        });
    }

    createInternalOrder(orderData){
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql = `INSERT INTO INTERNAL_ORDER (ISSUE_DATE, STATE, CUSTOMER_ID)
                VALUES(?, ?, ?)`;
                this.db.run(sql, [orderData.issueDate, 'ISSUED', orderData.customerId], (err) => {
                    if(err){
                        // reports error while querying database
                        console.log('createInternalOrder() sql.run error:: ', err);
                        reject(503);    // 503 Service Unavailable (generic error)
    
                    }
                });

                let sql2 = `SELECT ID FROM INTERNAL_ORDER WHERE (ISSUE_DATE=? AND STATE=? AND CUSTOMER_ID=?)`;
                this.db.all(sql2, [orderData.issueDate, 'ISSUED', orderData.customerId], (err2, rows2) => {
                    if(err2){
                        // reports error while querying database
                        console.log('createInternalOrder() sql2.all error:: ', err2);
                        reject(503);    // 503 Service Unavailable (generic error)
    
                    } else {
                        let id = rows2.map((r) => (
                            r.ID
                        ))[0];

                        if(orderData.products.length > 0) {
                            orderData.products.forEach(p => {
                                let sql3 = `INSERT INTO SKU_IN_INTERNALORDER (INTERNAL_ORDER_ID, SKU_ID, DESCRIPTION, PRICE, QTY)
                                            VALUES(?,?,?,?,?)`;
                                this.db.run(sql3, [id, p.SKUId, p.description, p.price, p.qty], (err3) => {
                                    if(err3){
                                        // reports error while querying database
                                        console.log('createInternalOrder() sql3.all error:: ', err3);
                                        reject(503);    // 503 Service Unavailable (generic error)
                    
                                    } else {
                                        resolve(201);
                    
                                    }
                                });
                            });
                        } else {
                            resolve(201);
                        }
                    }
                });
            }
        });
    }

    modifyInternalOrderState(data) {
        return new Promise((resolve, reject) =>  {
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT ID FROM INTERNAL_ORDER WHERE ID=?';
                this.db.all(sql1, [data.id], (err1, rows1) => {
                    if(err1){
                        // reports error while querying database
                        console.log('modifyInternalOrder() sql1.run error:: ', err1);
                        reject(503);    // 503 Service Unavailable (generic error)
    
                    } else {
                        const id = rows1.map((r) => (
                            r.ID
                        ));

                        if(id.length == 0) {
                            reject(404);    // 404 Not Found
        
                        } else {

                            let sql2 = 'UPDATE INTERNAL_ORDER SET STATE=? WHERE ID=?';
                            this.db.run(sql2, [data.newState, data.id], (err2) => {
                                if(err2){
                                    // reports error while querying database
                                    console.log('modifyInternalOrder() sql2.run error:: ', err2);
                                    reject(503);    // 503 Service Unavailable (generic error)
                
                                } else {
                                    if(data.newState == 'COMPLETED') {

                                        for (let i = 0; i < data.products.length; i++) {
                                            let p = data.products[i];                                            

                                            // SIMPLY ADD RFID IN SKUITEM_IN_INTERNALORDER TABLE AT INTERNAL_ORDER_ID ENTRY
                                            let sql3 = `INSERT INTO SKUITEM_IN_INTERNALORDER (INTERNAL_ORDER_ID, SKU_ID, RFID)
                                                        VALUES (?,?,?);`;
                                            this.db.run(sql3, [data.id, p.SkuID, p.RFID], (err3) => {
                                                //console.log('i', i);
                                                //console.log('tot', data.products.length-1);
                                                if(err3){
                                                    // reports error while querying database
                                                    console.log('modifyInternalOrder() sql3.run error:: ', err3);
                                                    reject(503);    // 503 Service Unavailable (generic error)
                                
                                                } else if(i == data.products.length-1) {
                                                    resolve(200);   // 202 OK Success
                                
                                                }
                                            });
                                            
                                        }
                                        resolve(200);
                                    } else {
                                        resolve(200);   // 200 OK
                     
                                    }
                                }
                            });
                        }
                        
                    }
                })
            } else {
                reject(401);
            }
        });
    }

    deleteInternalOrder(orderId){
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql = `DELETE FROM SKUITEM_IN_INTERNALORDER WHERE INTERNAL_ORDER_ID=?`;
                this.db.run(sql, [orderId], (err) => {
                    if(err){
                        // reports error while querying database
                        console.log('deleteInternalOrder() sql.run error:: ', err);
                        reject(503);    // 503 Service Unavailable (generic error)
    
                    } else {

                        let sql2 = 'DELETE FROM SKU_IN_INTERNALORDER  WHERE INTERNAL_ORDER_ID=?';
                        this.db.run(sql2, [orderId], (err2) => {
                            if(err2){
                                // reports error while querying database
                                console.log('deleteInternalOrder() sql.run error:: ', err2);
                                reject(503);    // 503 Service Unavailable (generic error)
            
                            } else {
                                let sql3 = 'DELETE FROM INTERNAL_ORDER WHERE ID=?';
                                this.db.run(sql3, [orderId], (err3) => {
                                    if(err3){
                                        // reports error while querying database
                                        console.log('deleteInternalOrder() sql2.run error:: ', err3);
                                        reject(503);    // 503 Service Unavailable (generic error)
                    
                                    } else {

                                        resolve(204);   // 204 No Content (success)
                                        
                                    }
                                });
                            }
                        })
                    }
                });
            } else {
                reject(401);    // 401 Unauthorized
            }
        });
    }

}

module.exports = InternalOrderDAO;