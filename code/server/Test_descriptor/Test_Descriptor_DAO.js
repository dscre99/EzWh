const DB = require('../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;



class TestDescriptorDAO {
    #db = undefined;

    constructor() {
        this.#db = DBinstance;
    }

    get_test_descriptors_DB() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM TEST_DESCRIPTOR;';
            this.#db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const test_descriptors = rows.map((test_descriptor) => (
                    {
                        id:test_descriptor.id,
                        name:test_descriptor.name,
                        procedureDescription:test_descriptor.procedureDescription,
                        idSKU:test_descriptor.idSKU
                    }
                ));
                resolve(test_descriptors);
            });
        });
    }
    
    get_test_descriptor_by_ID_DB(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM TEST_DESCRIPTOR WHERE id = ?';
            this.#db.all(sql, [id], (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        const test_descriptor = rows.map((test_descriptor) => (
                            {
                                id:test_descriptor.id,
                                name:test_descriptor.name,
                                procedureDescription:test_descriptor.procedureDescription,
                                idSKU:test_descriptor.idSKU
                            }
                        ));
                        test_descriptor.length === 0 ? reject(`Test Descriptor with id=${id} doesn't exist!`) : resolve(test_descriptor);
                    }
                });
        });
    }
    
    post_test_descriptor_DB(data) { 
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO TEST_DESCRIPTOR(id, name, procedureDescription, idSKU) VALUES (?,?,?,?)';
            this.#db.run(sql, [data.id, data.name, data.procedureDescription, data.idSKU], (err) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data.id);
            });
        });
    }
    
    put_test_descriptor_by_ID_DB(id, body) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE TEST_DESCRIPTOR SET name=?,procedureDescription=?, idSKU= ? WHERE id = ?';
            this.#db.run(sql, [body.name, body.procedureDescription, body.idSKU, id], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
    
        });
    }
    
    
    delete_test_descriptor_by_ID_DB(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM TEST_DESCRIPTOR WHERE id=?;';
            this.#db.run(sql, [id], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
    
        });
    }
    


}

module.exports = TestDescriptorDAO;