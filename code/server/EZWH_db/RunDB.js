const DB = require('./EZWH_db');
const DBinstance = (new DB('EZWH_DB_TEST')).getDB();

exports.DBinstance = DBinstance;