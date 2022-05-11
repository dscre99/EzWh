const req = require('express/lib/request');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Position/EZWH.db', sqlite3.OPEN_READWRITE, (err) => {
	if(err) {
		throw(err);
	} else {
		console.log("Connected to the Database!")
	}
} )


function getPositions() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM POSITION;';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            const positions = rows.map((position) => (
                {
                    positionID:position.positionID,
                    aisleID:position.aisleID,
                    row:position.row,
                    col:position.col,
                    maxWeight:position.maxWeight,
                    maxVolume:position.maxVolume,
                    occupiedWeight:position.occupiedWeight,
                    occupiedVolume:position.occupiedVolume
                }
            ));
            resolve(positions);
        });
    });
}

function storePosition(data) { 
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO POSITION(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)';
        db.run(sql, [data.positionID, data.aisleID, data.row, data.col, data.maxWeight, data.maxVolume, 0, 0], (err) => {
            if (err) {
                reject(err);
                return
            }
            resolve(data.positionID);
        });
    });
}

function put_position_by_ID_DB(positionID, body) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE POSITION SET aisleID = ? ,row= ?,col= ?,maxWeight= ?,maxVolume= ?,occupiedWeight= ?, occupiedVolume= ? WHERE positionID = ?';
           db.run(sql, [body.aisleID, body.row, body.col, body.maxWeight, body.maxVolume, body.occupiedWeight, body.occupiedVolume,  positionID], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

    });
}

function put_positionID_by_ID_DB(positionID, body) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE POSITION SET positionID = ? WHERE positionID = ?';
           db.run(sql, [body.positionID, positionID], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

    });
}

function delete_position_by_ID_DB(positionID) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM POSITION WHERE positionID = ?';
           db.run(sql, [positionID], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

    });
}




module.exports = {getPositions, storePosition, put_position_by_ID_DB, put_positionID_by_ID_DB, delete_position_by_ID_DB}


// class Position_DAO{
//     sqlite = require('sqlite3');

//     constructor(dbname) {
//         this.db = new this.sqlite.Database(dbname, this.sqlite.OPEN_READWRITE,  (err) => {
//             if(err) {
//                 throw(err); 
//             } else {
//                 console.log("Connected to the Database!")
//             }
//         });
//     }
//     // RESTOCK ORDER TABLE
//     dropTableRestockOrder() {
//         return new Promise((resolve, reject)  => {
//             const sql = 'DROP TABLE IF EXISTS RESTOCK_ORDER';
//             this.db.run(sql, (err) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve(this.lastID);
//             });
//         });
//     }

//     newTableRestockOrder() {
//         return new Promise((resolve, reject)  => {
//             const sql = 'CREATE TABLE IF NOT EXISTS RESTOCK_ORDER(ID INTEGER PRIMARY KEY AUTOINCREMENT, ISSUEDATE DATETIME, STATE VARCHAR, SUPPLIERID INTEGER REFERENCES SUPPLIERD(ID), TRANSPORTNOTE DATE  )';
//             this.db.run(sql, (err) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve('RESTOCK_ORDER');
//             });
//         });
//     }

//     //PRODUCTS TABLE: N-N from Restock_Order to SKU
//     dropTableProducts() {
//         return new Promise((resolve, reject)  => {
//             const sql = 'DROP TABLE IF EXISTS PRODUCTS';
//             this.db.run(sql, (err) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve(this.lastID);
//             });
//         });
//     }

//     newTableProducts() {
//         return new Promise((resolve, reject)  => {
//             const sql = 'CREATE TABLE IF NOT EXISTS PRODUCTS(ORDERID INEGER REFERENCES RESTOCK_ORDER(ID), SKUID INTEGER REFERENCES SKU(ID), PRIMARY KEY(ORDERID,SKUID), DESCRIPTION VARCHAR, PRICE REAL, QUANTITY INT )';
//             this.db.run(sql, (err) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve('RESTOCK_ORDER');
//             });
//         });
//     }

//     // ITEMS TABLE: N-N from Restock_Order to SKUItem
//     dropTableItems() {
//         return new Promise((resolve, reject)  => {
//             const sql = 'DROP TABLE IF EXISTS ITEMS';
//             this.db.run(sql, (err) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve(this.lastID);
//             });
//         });
//     }

//     newTableItems() {
//         return new Promise((resolve, reject)  => {
//             const sql = 'CREATE TABLE IF NOT EXISTS ITEMS(ORDERID INEGER REFERENCES RESTOCK_ORDER(ID), SKUID INTEGER , RFID INTEGER, (SKUID, RFID) REFERENCES SKUITEM(ID,RFID), PRIMARY KEY(ORDERID,SKUID,RFID) )';
//             this.db.run(sql, (err) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 resolve('RESTOCK_ORDER');
//             });
//         });
//     }

//     // GETTERS

//     getPositions(){
//         return new Promise((resolve, reject) => {
//             console.log("DIO")
//             const sql = 'SELECT * FROM POSITION;';
//             this.db.run(sql, [], (err, rows) => {
//                 if(err){
//                     console.log("DIO1", err.message)
//                     reject(err);
//                     return;
//                 }
//                 console.log("DIO2")
//                 const positions = rows.map((position) => (
//                     {
//                         positionID:position.positionID,
//                         aisleID:position.aisleID,
//                         row:position.row,
//                         col:position.col,
//                         maxWeight:position.maxWeight,
//                         maxVolume:position.maxVolume,
//                         occupiedWeight:position.occupiedWeight,
//                         occupiedVolume:position.occupiedVolume
//                     }
//                 ));
//                 resolve(positions);
//             });
//         });
//     }

//     storePosition(data){
//         return new Promise((resolve, reject) => {
//             const sql = 'INSERT INTO POSITION(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)';
//             this.db.run(sql, [data.positionID, data.aisleID, data.row, data.col, data.maxWeight, data.maxVolume, 0, 0], (err) => {
//                 if (err) {
//                     reject(err);
//                     return
//                 }
//                 resolve(data.positionID);
//             });
//         });
//     }



    

// }

// module.exports = Position_DAO;

// // class Position_DAO {
    
     

// //     constructor(dbname) {                                                                                                                                          
        
// //         this.sqlite3 = require('sqlite3').verbose();
// //         this.db = new this.sqlite3.Database(dbname, this.sqlite3.OPEN_READWRITE, (err) => {
// //             if(err) {
// //                 console.log(err.message)
// //                 throw(err);
// //             } else {
// //                 console.log(`Connected to the Database ${dbname}`)
// //             }
// //         });  
// //     }

    

// //     dropTablePosition() {
// //         return new Promise((resolve, reject)  => {
// //             const sql = 'DROP TABLE IF EXISTS POSITION';
// //             this.db.run(sql, (err) => {
// //                 if (err) {
// //                     reject(err);
// //                     return;
// //                 }
// //                 resolve(this.lastID);
// //             });
// //         });
// //     }

// //     newTablePosition() {
// //         return new Promise((resolve, reject)  => {
// //             const sql = 'CREATE TABLE IF NOT EXISTS POSITION(positionID VARCHAR PRIMARY KEY, aisleID VARCHAR, row INTEGER, col INTEGER, maxWeight INTEGER, maxVolume INTEGER, occupiedWeight INTEGER, occupiedVolume INTEGER)';
// //             this.db.run(sql, (err) => {
// //                 if (err) {
// //                     reject(err);
// //                     return;
// //                 }
// //                 resolve('POSITION');
// //             });
// //         });
// //     }


 
    

// // }

// // module.exports = Position_DAO;