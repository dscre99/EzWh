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
            const sql = 'SELECT * FROM TEST_DESCRIPTOR;';
            this.#db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                }
                const test_descriptors = rows.map((test_descriptor) => (
                    {
                        ID:test_descriptor.ID,
                        NAME:test_descriptor.NAME,
                        PROCEDUREDESCRIPTION:test_descriptor.PROCEDUREDESCRIPTION,
                        IDSKU:test_descriptor.IDSKU
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
                                ID:test_descriptor.ID,
                                NAME:test_descriptor.NAME,
                                PROCEDUREDESCRIPTION:test_descriptor.PROCEDUREDESCRIPTION,
                                IDSKU:test_descriptor.IDSKU
                            }
                        ));
                        test_descriptor.length === 0 ? reject(`Test Descriptor with id=${id} doesn't exist!`) : resolve(test_descriptor);
                    }
                });
        });
    }
    
    post_test_descriptor_DB(data) { 
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO TEST_DESCRIPTOR(NAME, PROCEDUREDESCRIPTION, IDSKU) VALUES (?,?,?)';
            this.#db.run(sql, [data.NAME, data.PROCEDUREDESCRIPTION, data.IDSKU], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
    
    put_test_descriptor_by_ID_DB(id, body) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE TEST_DESCRIPTOR SET name=?,procedureDescription=?, idSKU= ? WHERE id = ?';
            this.#db.run(sql, [body.NAME, body.PROCEDUREDESCRIPTION, body.IDSKU, id], (err) => {
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