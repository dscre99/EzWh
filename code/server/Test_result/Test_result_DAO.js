const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;

function get_test_results_DB(rfid) {

    return new Promise((resolve, reject) => {

        const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
        let exist = 0;
        
        DBinstance.all(check_rfid, [rfid], (err, result) => {
            
            if(err) {
                reject(err);
                return;
            }
            
            result[0]['COUNT(*)'] > 0 ? exist=1 : exist

            if(exist) {
                const sql = 'SELECT * FROM TEST_RESULT WHERE RFID=?';
                DBinstance.all(sql, [rfid], (err, rows) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    const test_results = rows.map((test_result) => (
                        {
                            id:test_result.ID,
                            rfid:test_result.RFID,
                            date:test_result.DATE,
                            result:test_result.RESULT,
                            idTestDescriptor:test_result.IDTESTDESCRIPTOR
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

function get_test_result_with_id_from_rfid_DB(id, rfid) {
    return new Promise((resolve, reject) => {

        const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
        let exist = 0;
        
        DBinstance.all(check_rfid, [rfid], (err, result) => {
            
            if(err) {
                reject(err);
                return;
            }
            
            result[0]['COUNT(*)'] > 0 ? exist=1 : exist

            if(exist) {
                const sql = 'SELECT * FROM TEST_RESULT WHERE RFID=? AND ID=?';
                DBinstance.all(sql, [rfid, id], (err, rows) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    const test_results = rows.map((test_result) => (
                        {
                            id:test_result.ID,
                            rfid:test_result.RFID,
                            date:test_result.DATE,
                            result:test_result.RESULT,
                            idTestDescriptor:test_result.IDTESTDESCRIPTOR
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

function post_test_result_DB(data) { 
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO TEST_RESULT(RFID, DATE, RESULT, IDTESTDESCRIPTOR) VALUES (?,?,?,?)';
        DBinstance.run(sql, [data.rfid, data.Date, data.Result, data.idTestDescriptor], (err) => {
            if (err) {
                reject(err);
                return
            }
            resolve("Test Result succesfully added to the Database!");
        });
    });
}

function put_test_result_with_id_from_rfid_DB(id, rfid, data) {

    return new Promise((resolve, reject) => {

        const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
        let exist = 0;
        
        DBinstance.all(check_rfid, [rfid], (err, result) => {
            
            if(err) {
                reject(err);
                return;
            }
            
            result[0]['COUNT(*)'] > 0 ? exist=1 : exist

            if(exist) {
                const sql = 'UPDATE TEST_RESULT SET IDTESTDESCRIPTOR=?, DATE=?, RESULT= ? WHERE ID=? AND RFID=?';
                DBinstance.all(sql, [data.newIdTestDescriptor, data.newDate, data.newResult, id, rfid], (err, rows) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    const test_results = rows.map((test_result) => (
                        {
                            id:test_result.ID,
                            rfid:test_result.RFID,
                            date:test_result.DATE,
                            result:test_result.RESULT,
                            idTestDescriptor:test_result.IDTESTDESCRIPTOR
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


function delete_test_result_with_id_from_rfid_DB(id, rfid) {

    return new Promise((resolve, reject) => {

        const check_rfid = 'SELECT COUNT(*) FROM SKU_ITEM WHERE RFID=?'
        let exist = 0;
        
        DBinstance.all(check_rfid, [rfid], (err, result) => {
            
            if(err) {
                reject(err);
                return;
            }
            
            result[0]['COUNT(*)'] > 0 ? exist=1 : exist

            if(exist) {
                const sql = 'DELETE FROM TEST_RESULT WHERE ID=? AND RFID=? ';
                DBinstance.all(sql, [id, rfid], (err, rows) => {
                    if(err){
                        reject(err);
                        return;
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





module.exports = {get_test_results_DB, get_test_result_with_id_from_rfid_DB, post_test_result_DB, put_test_result_with_id_from_rfid_DB, delete_test_result_with_id_from_rfid_DB}