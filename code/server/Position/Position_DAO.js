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


