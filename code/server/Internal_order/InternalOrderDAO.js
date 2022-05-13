const { json } = require('body-parser');
const DB = require('../EZWH_db/EZWH_db.js');
const DBinstance = new DB('EZWH_db/EZWH_db');

class InternalOrderDAO {
    
    getInternalOrders() {

        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT * FROM INTERNAL_ORDERS';
                DBinstance.getDB().all(sql1, (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('getthis.InternalOrders() sql1.run error:: ', err);
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
                        DBinstance.getDB().all(sql2, (err2, rows2) => {
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
                                DBinstance.getDB().all(sql3, (err3, rows3) => {
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
    //             DBinstance.getDB().all(sql1, (err, rows) => {
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
}

module.exports = InternalOrderDAO;