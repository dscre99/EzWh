class EZWH_db {
    #sqlite3 = require('sqlite3');
    #fs = require('fs');
    #db = undefined

    constructor(dbname) {
        
        var dbFile = './EZWH_db/' + dbname + '.db';
        this.#db = new this.#sqlite3.Database(dbFile);
    }

    getDB() {
        return this.#db;
    }
}

module.exports = EZWH_db;