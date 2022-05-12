const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../EZWH_db/EZWH_Daniele.db.db', sqlite3.OPEN_READWRITE, (err) => {
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

module.exports = {get_test_descriptors_DB}