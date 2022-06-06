const res = require('express/lib/response');
const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;


class PositionDAO {

    #db = undefined;

    constructor() {
        this.#db = DBinstance;
    }

    dropPositionTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS POSITION';
            this.#db.run(sql, (err) => {
                if (err) {
                    console.log('dropPositionTable error:', err);
                    reject(500);
                } else {
                    resolve(200);
                }
            });
        });
    }

    newPositionTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE POSITION ( "positionID" TEXT, "aisleID" TEXT, "row" INTEGER, "col" INTEGER, "maxWeight" INTEGER,"maxVolume" INTEGER,"occupiedWeight"	INTEGER,"occupiedVolume" INTEGER, PRIMARY KEY("positionID"))';
            this.#db.run(sql, (err) => {
                if (err) {
                    console.log('newPositionTable error:', err);
                    reject(500);
                } else {
                    resolve(200);
                }
            });
        });
    }

    getPositions() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM POSITION';
            this.#db.all(sql, [], (err, rows) => {
                if(err){
                    reject(503);
                } else {
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
                }    
            });
            
        });
        
    }
    
    
    
    storePosition(data) { 
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO POSITION(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)';
            this.#db.run(sql, [data.positionID, data.aisleID, data.row, data.col, data.maxWeight, data.maxVolume, 0, 0], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(data.positionID);   
                }
            });
        });
    }
    
    put_position_by_ID_DB(positionID, body) {
        return new Promise((resolve, reject) => {

            const check_positionID = 'SELECT COUNT(*) FROM POSITION WHERE positionID=?';
            
            let exist = 0;
            
            this.#db.all(check_positionID, [positionID], (err, result) => {
                
                
                if(err) {
                    reject(503);
                } else {
                    result[0]['COUNT(*)'] > 0 ? exist=1 : exist
            

                    if(exist) {
                        const sql = 'UPDATE POSITION SET aisleID=? ,row=?,col=?,maxWeight=?,maxVolume=?,occupiedWeight=?, occupiedVolume=? WHERE positionID =?';
                        this.#db.run(sql, [body.newAisleID, body.newRow, body.newCol, body.newMaxWeight, body.newMaxVolume, body.newOccupiedWeight, body.newOccupiedVolume,  positionID], (err) => {
                            if (err) {
                                reject(503);
                            } else {
                                resolve(true);
                            }
                        });
                    } else {
                        reject(404);
                    }
                }
            });
        });
    }
    
    put_positionID_by_ID_DB(positionID, body) {
        return new Promise((resolve, reject) => {

            const check_positionID = 'SELECT COUNT(*) FROM POSITION WHERE positionID=?';
            
            let exist = 0;
            
            this.#db.all(check_positionID, [positionID], (err, result) => {

                if(err) {
                    reject(503);
                } else {
                    result[0]['COUNT(*)'] > 0 ? exist=1 : exist
            
                    if(exist) {

                        const get_old_row = 'SELECT * FROM POSITION WHERE positionID=?';
                        

                        this.#db.all(get_old_row, [positionID], (err, row) => {
                            if (err) {
                                reject(503);
                            } else {
                                const delete_sql = 'DELETE FROM POSITION WHERE positionID=?'
                                this.#db.run(delete_sql, [positionID], (err) => {
                                    if(err) {
                                        reject(503);
                                    } else {
                                        // resolve(true);
                                        const sql = 'INSERT INTO POSITION(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)'
                                        this.#db.run(sql, [body.newPositionID, row[0].aisleID, row[0].row, row[0].col, row[0].maxWeight, row[0].maxVolume, row[0].occupiedWeight, row[0].occupiedVolume], (err) => {
                                            if (err) {
                                                reject(503);
                                            } else {
                                                resolve(true);
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    } else {
                        reject(404);
                    }
                }                
            })
    
        });
    }
    
    delete_position_by_ID_DB(positionID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM POSITION WHERE positionID = ?';
            this.#db.run(sql, [positionID], (err) => {
                if (err) {
                    console.log('delete_position_by_ID_DB error:', err);
                    reject(503);
                } else {
                    resolve(true);
                }
            });
        });
    } 
    
    
}


module.exports = PositionDAO;
