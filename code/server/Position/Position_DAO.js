const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;


class PositionDAO {

    #db = undefined;

    constructor() {
        this.#db = DBinstance;
    }

    getPositions() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM POSITION;';
            this.#db.all(sql, [], (err, rows) => {
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
                ))
                resolve(positions)    
            })
    
            
        })
        
    }
    
    
    
    storePosition(data) { 
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO POSITION(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES (?,?,?,?,?,?,?,?)';
            this.#db.run(sql, [data.positionID, data.aisleID, data.row, data.col, data.maxWeight, data.maxVolume, 0, 0], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.positionID);
            });
        });
    }
    
    put_position_by_ID_DB(positionID, body) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE POSITION SET aisleID = ? ,row= ?,col= ?,maxWeight= ?,maxVolume= ?,occupiedWeight= ?, occupiedVolume= ? WHERE positionID = ?';
            this.#db.run(sql, [body.aisleID, body.row, body.col, body.maxWeight, body.maxVolume, body.occupiedWeight, body.occupiedVolume,  positionID], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
    
        });
    }
    
    put_positionID_by_ID_DB(positionID, body) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE POSITION SET positionID = ? WHERE positionID = ?';
            this.#db.run(sql, [body.positionID, positionID], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
    
        });
    }
    
    delete_position_by_ID_DB(positionID) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM POSITION WHERE positionID = ?';
            this.#db.run(sql, [positionID], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
    
        });
    }
    
}


module.exports = PositionDAO;
