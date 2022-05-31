const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;



class TestDescriptorDAO {
    #db = undefined;

    constructor() {
        this.#db = DBinstance;
    }

    dropTestDescriptorTable() {
        return new Promise((resolve, reject) => {
            const sql = 'DROP TABLE IF EXISTS TEST_DESCRIPTOR';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200)
            })
        });
    }

    newTestDescriptorTable() {
        return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE TEST_DESCRIPTOR ( "ID" INTEGER, "NAME" TEXT, "PROCEDUREDESCRIPTION" TEXT, "IDSKU" INTEGER, PRIMARY KEY("ID" AUTOINCREMENT))';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(200);
            });
        });
    }


    get_test_descriptors_DB() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM TEST_DESCRIPTOR';
            this.#db.all(sql, [], (err, rows) => {
                if(err){
                    reject(503);
                }
                const test_descriptors = rows.map((test_descriptor) => (

                    {
                        id:test_descriptor.ID,
                        name:test_descriptor.NAME,
                        procedureDescription:test_descriptor.PROCEDUREDESCRIPTION,
                        idSKU:test_descriptor.IDSKU
                    }
                ))
                resolve(test_descriptors);
            })
        })
    }
    
    get_test_descriptor_by_ID_DB(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM TEST_DESCRIPTOR WHERE ID=?';
            this.#db.all(sql, [id], (err, rows) => {
                    if (err) {
                        reject(503);
                    } else {
                        const test_descriptors = rows.map((test_descriptor) => (
                            {
                                id:test_descriptor.ID,
                                name:test_descriptor.NAME,
                                procedureDescription:test_descriptor.PROCEDUREDESCRIPTION,
                                idSKU:test_descriptor.IDSKU
                            }
                        ));
                        test_descriptors.length === 0 ? reject(404) : resolve(test_descriptors[0]);
                    }
                });
        });
    }
    
    post_test_descriptor_DB(data) { 
        return new Promise((resolve, reject) => {

            const check_skuID = 'SELECT COUNT(*) FROM SKU WHERE ID=?';
            
            let exist = 0;
            
            this.#db.all(check_skuID, [data.idSKU], (err, result) => {
                
                if(err) {
                    reject(503);
                }
                    
                result[0]['COUNT(*)'] > 0 ? exist=1 : exist

                if(exist) {
                    const sql = 'INSERT INTO TEST_DESCRIPTOR(NAME, PROCEDUREDESCRIPTION, IDSKU) VALUES (?,?,?)';
                    this.#db.run(sql, [data.name, data.procedureDescription, data.idSKU], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(true);
                    });
                } else {
                    reject(404);
                }
                
                
           
            })
            
            
        });
    }
    
    put_test_descriptor_by_ID_DB(id, body) {
        return new Promise((resolve, reject) => {

            const check_tdId = 'SELECT COUNT(*) FROM TEST_DESCRIPTOR WHERE ID=?';
            const check_idSKU = 'SELECT COUNT(*) FROM SKU WHERE ID=?';
            
            let exist = 0;
            
            this.#db.all(check_tdId, [id], (err, result) => {
                if(err) {
                    reject(503);
                }
                    
                result[0]['COUNT(*)'] > 0 ? exist+=1 : exist

                this.#db.all(check_idSKU, [body.newIdSKU], (err, result) => {

                    if(err) {
                        reject(503);
                    }
                        
                    result[0]['COUNT(*)'] > 0 ? exist+=1 : exist

                    if(exist === 2) {
                        const sql = 'UPDATE TEST_DESCRIPTOR SET NAME=?,PROCEDUREDESCRIPTION=?, IDSKU=? WHERE ID=?';
                        this.#db.run(sql, [body.newName, body.newProcedureDescription, body.newIdSKU, id], (err) => {
                                if (err) {
                                    reject(503);
                                } else {
                                    resolve(true);
                                }
                            });
                    } else {
                        reject(404);
                    }
                })

                
            
            })
        });
    }
    
    
    delete_test_descriptor_by_ID_DB(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM TEST_DESCRIPTOR WHERE ID=?;';
            this.#db.run(sql, [id], (err) => {
                    if (err) {
                        reject(503);
                    } else {
                        resolve(true);
                    }
                });
    
        });
    }
}

module.exports = TestDescriptorDAO;