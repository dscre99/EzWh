const res = require('express/lib/response');
const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;

class TestResultDAO {
    #db = undefined;

    constructor() {
        this.#db = DBinstance;
    }

    dropTestResultTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS TEST_RESULT';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200)
            })
        });
    }

    newTestResultTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE TEST_RESULT("ID" INTEGER, "RFID" TEXT, "DATE" TEXT, "RESULT" TEXT, "IDTESTDESCRIPTOR" INTEGER, PRIMARY KEY("ID" AUTOINCREMENT), FOREIGN KEY("IDTESTDESCRIPTOR") REFERENCES TEST_DESCRIPTOR("ID"))';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200);
            });
        });
    }

    get_test_results_DB(rfid) {

        return new Promise((resolve, reject) => {
    
            const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
            let exist = 0;
            
            this.#db.all(check_rfid, [rfid], (err, result) => {
                
                if(err) {
                    reject(err);
                }
                
                result[0]['COUNT(*)'] > 0 ? exist=1 : exist
    
                if(exist) {
                    const sql = 'SELECT * FROM TEST_RESULT WHERE RFID=?';

                    this.#db.all(sql, [rfid], (err, rows) => {
                        if(err){
                            reject(err);
                        }
                        const test_results = rows.map((test_result) => (
                            {
                                ID:test_result.ID,
                                RFID:test_result.RFID,
                                DATE:test_result.DATE,
                                RESULT:test_result.RESULT,
                                IDTESTDESCRIPTOR:test_result.IDTESTDESCRIPTOR
                            }
                        ));
                        resolve(test_results);
                    });   
                } else {
                    reject("The requested RFID doesn't exist!")
                }
            }) 
        });
    }
    
    get_test_result_with_id_from_rfid_DB(id, rfid) {
        return new Promise((resolve, reject) => {
    
            const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
            let exist = 0;
            
            this.#db.all(check_rfid, [rfid], (err, result) => {
                
                if(err) {
                    reject(err);
                }
                
                result[0]['COUNT(*)'] > 0 ? exist=1 : exist
    
                if(exist) {
                    const sql = 'SELECT * FROM TEST_RESULT WHERE RFID=? AND ID=?';
                    this.#db.all(sql, [rfid, id], (err, rows) => {
                        if(err){
                            reject(err);
                        }
                        const test_results = rows.map((test_result) => (
                            {
                                ID:test_result.ID,
                                RFID:test_result.RFID,
                                DATE:test_result.DATE,
                                RESULT:test_result.RESULT,
                                IDTESTDESCRIPTOR:test_result.IDTESTDESCRIPTOR
                            }
                        ));
                        resolve(test_results);
                    });   
                } else {
                    reject("The requested RFID doesn't exist!")
                }
            }) 
        });
    }
    
    post_test_result_DB(data) { 
        return new Promise((resolve, reject) => {

            const check_skuID = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?';
            
            let exist = 0;
            
            this.#db.all(check_skuID, [data.rfid], (err, result) => {
                
                if(err) {
                    reject(503);
                }
                    
                result[0]['COUNT(*)'] > 0 ? exist=1 : exist

                if(exist) {
                    const sql = 'INSERT INTO TEST_RESULT(RFID, DATE, RESULT, IDTESTDESCRIPTOR) VALUES (?,?,?,?)';
                this.#db.run(sql, [data.rfid, data.Date, data.Result, data.idTestDescriptor], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve("Test Result succesfully added to the Database!");
                });
                } else {
                    reject(404);
                }

            });
            
        });
    }
    
    put_test_result_with_id_from_rfid_DB(id, rfid, data) {
    
        return new Promise((resolve, reject) => {
    
            const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
            let exist = 0;
            
            this.#db.all(check_rfid, [rfid], (err, result) => {
                
                if(err) {
                    reject(err);
                }
                
                result[0]['COUNT(*)'] > 0 ? exist=1 : exist

                
    
                if(exist) {
                    const sql = 'UPDATE TEST_RESULT SET IDTESTDESCRIPTOR=?, DATE=?, RESULT=? WHERE ID=? AND RFID=?';
                    this.#db.all(sql, [data.IDTESTDESCRIPTOR, data.DATE, data.RESULT, id, rfid], (err, rows) => {
                        if(err){
                            reject(err);
                        }
                        const test_results = rows.map((test_result) => (
                            {
                                ID:test_result.ID,
                                RFID:test_result.RFID,
                                DATE:test_result.DATE,
                                RESULT:test_result.RESULT,
                                IDTESTDESCRIPTOR:test_result.IDTESTDESCRIPTOR
                            }
                        ));
                        resolve("Test Result Updated!");
                    });   
                } else {
                    reject("The requested RFID doesn't exist!")
                }
            }) 
        });
    }
    
    
    delete_test_result_with_id_from_rfid_DB(id, rfid) {
    
        return new Promise((resolve, reject) => {
    
            const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
            let exist = 0;
            
            this.#db.all(check_rfid, [rfid], (err, result) => {
                
                if(err) {
                    reject(err);
                }
                
                result[0]['COUNT(*)'] > 0 ? exist=1 : exist
                
                if(exist) {
                    const sql = 'DELETE FROM TEST_RESULT WHERE ID=? AND RFID=? ';
                    this.#db.all(sql, [id, rfid], (err, rows) => {
                        if(err){
                            reject(err);
                        } else {
                            resolve(true);

                        }
                        
                    });   
                } else {
                    reject("The requested RFID doesn't exist!")
                }
            }) 
        });
    
    }


    
    
}

module.exports = TestResultDAO;