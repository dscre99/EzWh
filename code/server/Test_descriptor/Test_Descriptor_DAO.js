const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Test_Descriptor/EZWH_Daniele.db', sqlite3.OPEN_READWRITE, (err) => {
	if(err) {
        console.log("ERROREE")
		throw(err);
	} else {
		console.log("Connected to the Database!")
	}
} )


function get_test_descriptors_DB() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM TEST_DESCRIPTOR;';
        db.all(sql, [], (err, rows) => {
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

function get_test_descriptor_by_ID_DB(id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM TEST_DESCRIPTOR WHERE id = ?';
           db.all(sql, [id], (err, rows) => {
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

function post_test_descriptor_DB(data) { 
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO TEST_DESCRIPTOR(id, name, procedureDescription, idSKU) VALUES (?,?,?,?)';
        db.run(sql, [data.id, data.name, data.procedureDescription, data.idSKU], (err) => {
            if (err) {
                reject(err);
                return
            }
            resolve(data.id);
        });
    });
}

function put_test_descriptor_by_ID_DB(id, body) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE TEST_DESCRIPTOR SET name=?,procedureDescription=?, idSKU= ? WHERE id = ?';
           db.run(sql, [body.name, body.procedureDescription, body.idSKU, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

    });
}


function delete_test_descriptor_by_ID_DB(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM TEST_DESCRIPTOR WHERE id=?;';
           db.run(sql, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

    });
}





module.exports = {get_test_descriptors_DB, get_test_descriptor_by_ID_DB, post_test_descriptor_DB, put_test_descriptor_by_ID_DB, delete_test_descriptor_by_ID_DB}