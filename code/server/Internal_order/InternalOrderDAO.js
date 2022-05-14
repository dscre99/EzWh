const { json } = require('body-parser');
const { resolve } = require('path');

class InternalOrderDAO {
    db = undefined;

    constructor(dbInstance) {
        this.db = dbInstance;
    }
    
    getInternalOrders() {

        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT * FROM INTERNAL_ORDERS';
                this.db.all(sql1, (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('getInternalOrders() sql1.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                        return;
                    } else {

                        const internalOrders = rows.map((r) => (
                            {
                                id:r.ID,
                                issueDate:r.ISSUE_DATE,
                                state:r.STATE,
                                customerId:r.CUSTOMER_ID
                            }
                        ));

                        //this.storeInternalOrders(intOrds);
                        //this.internalOrders = intOrds;

                        let sql2 = 'SELECT * FROM SKUITEM_IN_INTERNALORDER';
                        this.db.all(sql2, (err2, rows2) => {
                            if(err2){
                                // reports error while querying database
                                console.log('getInternalOrders() sql2.run error:: ', err2);
                                reject(500);    // 500 Internal Server Error (generic error)
                                return;
                            } else {
                                const SKUIDperOrder = rows2.map((r2) => (
                                    {
                                        OrderID:r2.INTERNAL_ORDER_ID,
                                        SKUID:r2.SKU_ID
                                    }
                                ));

                                let sql3 = 'SELECT * FROM SKU_ITEMS';
                                this.db.all(sql3, (err3, rows3) => {
                                    if(err3){
                                        // reports error while querying database
                                        console.log('getInternalOrders() sql3.run error:: ', err2);
                                        reject(500);    // 500 Internal Server Error (generic error)
                                        return;
                                    } else {
                                        const SKUItems = rows3.map((r3 => (
                                            {
                                                id:r3.ID,
                                                description:r3.DESCRIPTION,
                                                price:r3.PRICE,
                                                qty:r3.QTY,
                                                RFID:r3.RFID
                                            }
                                        )));
                                        // console.log(internalOrders);
                                        // console.log(SKUIDperOrder);
                                        // console.log(SKUItems);

                                        for (let i = 0; i < internalOrders.length; i++) {
                                            internalOrders[i]['products'] = [];

                                            for (let j = 0; j < SKUIDperOrder.length; j++) {
                                                if(internalOrders[i].id == SKUIDperOrder[j].OrderID) {
                                                    for (let k = 0; k < SKUItems.length; k++) {
                                                        // console.log(SKUIDperOrder[j].SKUID, SKUItems[k].id);
                                                        if(SKUIDperOrder[j].SKUID == SKUItems[k].id) {
                                                            internalOrders[i]['products'].push(SKUItems[k]);
                                                            k = SKUItems.length;

                                                            // console.log(SKUIDperOrder[j]);
                                                            // console.log(SKUItems[k]);
                                                            // console.log('\n\n\n');
                                                        }
                                                    }
                                                }
                                                
                                            }
                                        }
                                        
                                        //console.log(JSON.stringify(internalOrders));
                                        // return json(JSON.stringify(internalOrders));
                                        resolve(internalOrders); 
                                        return;
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

    // getInternalOrders() {

    //     return new Promise((resolve, reject) => {
    //         // !!! session checking to be implemented !!!
    //         let loggedAndAuthorized = true;
    //         if(loggedAndAuthorized) {

    //             let products = []
    //             let sql1 = `SELECT T.ID, T.SKU_ID, SI.DESCRIPTION, SI.PRICE, SI.QTY, SI.RFID
    //                         FROM (SELECT I.ID, S.SKU_ID
    //                                 FROM INTERNAL_ORDERS I
    //                                 JOIN SKUITEM_IN_INTERNALORDER S
    //                                 WHERE I.ID = S.INTERNAL_ORDER_ID) T
    //                         JOIN SKU_ITEMS SI
    //                         WHERE T.SKU_ID=SI.ID`
    //             this.db.getDB().all(sql1, (err, rows) => {
    //                 if(err){
    //                     // reports error while querying database
    //                     console.log('getthis.InternalOrders() sql1.run error:: ', err);
    //                     reject(500);    // 500 Internal Server Error (generic error)
    //                     return;
    //                 } else {
    //                     products = rows.map((r) => (
    //                         {
    //                             orderid:r.ID,
    //                             id:r.SKU_ID,
    //                             description:r.DESCRIPTION,
    //                             price:r.PRICE,
    //                             qty:r.QTY
    //                         }
    //                     ));                    
    //                 }                    
    //             });
    //             console.log(products);
                
    //         } else {
    //             reject(401);    // 401 Unauthorized
    //         }
    //     });
    // }

    createInternalOrder(orderData){
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql = `INSERT INTO INTERNAL_ORDERS (ISSUE_DATE, STATE, CUSTOMER_ID)
                VALUES(?, ?, ?)`;
                this.db.run(sql, [orderData.issueDate, 'ISSUED', orderData.customerId], (err) => {
                    if(err){
                        // reports error while querying database
                        console.log('createInternalOrder() sql.run error:: ', err);
                        reject(503);    // 503 Service Unavailable (generic error)
                        return;
                    }
                });

                let sql2 = `SELECT ID FROM INTERNAL_ORDERS WHERE (ISSUE_DATE=? AND STATE=? AND CUSTOMER_ID=?)`;
                this.db.all(sql2, [orderData.issueDate, 'ISSUED', orderData.customerId], (err2, rows2) => {
                    if(err2){
                        // reports error while querying database
                        console.log('createInternalOrder() sql2.all error:: ', err2);
                        reject(503);    // 503 Service Unavailable (generic error)
                        return;
                    } else {
                        let id = rows2.map((r) => (
                            r.ID
                        ))[0];

                        orderData.products.forEach(p => {
                            let sql3 = `INSERT INTO SKUITEM_IN_INTERNALORDER
                                        VALUES(?,?)`;
                            this.db.run(sql3, [id, p.SKUId], (err3) => {
                                if(err3){
                                    // reports error while querying database
                                    console.log('createInternalOrder() sql3.all error:: ', err3);
                                    reject(503);    // 503 Service Unavailable (generic error)
                                    return;
                                } else {
                                    resolve(201);
                                    return;
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    modifyInternalOrderState(data) {
        return new Promise((resolve, reject) =>  {
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT ID FROM INTERNAL_ORDERS WHERE ID=?';
                this.db.all(sql1, [data.id], (err1, rows1) => {
                    if(err1){
                        // reports error while querying database
                        console.log('modifyInternalOrder() sql1.run error:: ', err1);
                        reject(503);    // 503 Service Unavailable (generic error)
                        return;
                    } else {
                        const id = rows1.map((r) => (
                            r.ID
                        ));

                        if(id.length == 0) {
                            console.log(test)
                            reject(404);    // 404 Not Found
                            return;
                        } else {

                            let sql2 = 'UPDATE INTERNAL_ORDERS SET STATE=? WHERE ID=?';
                            this.db.run(sql2, [data.newState, data.id], (err2) => {
                                if(err2){
                                    // reports error while querying database
                                    console.log('modifyInternalOrder() sql2.run error:: ', err2);
                                    reject(503);    // 503 Service Unavailable (generic error)
                                    return;
                                } else {
                                    if(data.newState == 'COMPLETED') {
                                        // TO-DO: REGISTER NEW SKU_ITEMS

                                        for (let i = 0; i < data.products.length; i++) {
                                            let p = data.products[i];

                                            let actualDate = new Date();
                                            let date = actualDate.getFullYear() + '/' + (actualDate.getMonth()+1) + '/' + actualDate.getDate() + ' ' + actualDate.getHours() + ':' + actualDate.getMinutes();
                                            
                                            console.log(i, data.products.length-1);
                                            let sql3 = 'INSERT INTO SKU_ITEMS (RFID, SKUID, AVAILABLE, DATEOFSTOCK) VALUES (?,?,?,?)';
                                            this.db.run(sql3, [p.RFID, p.SkuID, 1, date], (err3) => {
                                                console.log('i', i);
                                                console.log('tot', data.products.length-1);
                                                if(err3){
                                                    // reports error while querying database
                                                    console.log('modifyInternalOrder() sql3.run error:: ', err3);
                                                    reject(503);    // 503 Service Unavailable (generic error)
                                                    return;
                                                } else if(i == data.products.length-1) {
                                                    resolve(200);   // 202 OK Success
                                                    return;
                                                }
                                            });
                                            
                                        }
                                        data.products.forEach(p => {
                                            
                                        });
                                    } else {
                                        resolve(200);   // 200 OK
                                        return; 
                                    }
                                }
                            });
                        }
                        
                    }
                })
            } else {
                reject(401);
                return;
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
                        return;
                    } else {

                        let sql2 = 'DELETE FROM INTERNAL_ORDERS WHERE ID=?';
                        this.db.run(sql2, [orderId], (err2) => {
                            if(err2){
                                // reports error while querying database
                                console.log('deleteInternalOrder() sql2.run error:: ', err2);
                                reject(503);    // 503 Service Unavailable (generic error)
                                return;
                            } else {

                                resolve(204);
                                return; // 204 No Content (success)
                            }
                        });
                    }
                });
            } else {

                reject(401);    // 401 Unauthorized
                return;
            }
        });
    }

}



module.exports = InternalOrderDAO;