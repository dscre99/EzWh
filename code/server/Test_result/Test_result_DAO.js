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

// function get_test_descriptor_by_ID_DB(id) {
//     return new Promise((resolve, reject) => {
//         const sql = 'SELECT * FROM TEST_DESCRIPTOR WHERE id = ?';
//            db.all(sql, [id], (err, rows) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     const test_descriptor = rows.map((test_descriptor) => (
//                         {
//                             id:test_descriptor.id,
//                             name:test_descriptor.name,
//                             procedureDescription:test_descriptor.procedureDescription,
//                             idSKU:test_descriptor.idSKU
//                         }
//                     ));
//                     test_descriptor.length === 0 ? reject(`Test Descriptor with id=${id} doesn't exist!`) : resolve(test_descriptor);
//                 }
//             });
//     });
// }

// function post_test_descriptor_DB(data) { 
//     return new Promise((resolve, reject) => {
//         const sql = 'INSERT INTO TEST_DESCRIPTOR(id, name, procedureDescription, idSKU) VALUES (?,?,?,?)';
//         db.run(sql, [data.id, data.name, data.procedureDescription, data.idSKU], (err) => {
//             if (err) {
//                 reject(err);
//                 return
//             }
//             resolve(data.id);
//         });
//     });
// }

// function put_test_descriptor_by_ID_DB(id, body) {
//     return new Promise((resolve, reject) => {
//         const sql = 'UPDATE TEST_DESCRIPTOR SET name=?,procedureDescription=?, idSKU= ? WHERE id = ?';
//            db.run(sql, [body.name, body.procedureDescription, body.idSKU, id], (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(true);
//                 }
//             });

//     });
// }


// function delete_test_descriptor_by_ID_DB(id) {
//     return new Promise((resolve, reject) => {
//         const sql = 'DELETE FROM TEST_DESCRIPTOR WHERE id=?;';
//            db.run(sql, [id], (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(true);
//                 }
//             });

//     });
// }





module.exports = {get_test_results_DB}