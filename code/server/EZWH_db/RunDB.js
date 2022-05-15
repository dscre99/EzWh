const DB = require('./EZWH_db');
const DBinstance = (new DB('EZWH_DB_TEST')).getDB();
console.log(DBinstance);

exports.DBinstance = DBinstance;