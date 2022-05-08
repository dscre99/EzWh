const User = require('./User.js')
const DB = require('./../EZWH_db/EZWH_db.js');
const { use } = require('chai');
const EZWH_db = require('./../EZWH_db/EZWH_db.js');


class UserDAO {
    #db = undefined;

    constructor(db) {
        this.#db = db;
    }

    newUserTable(){
        /*return new Promise((resolve, reject) => {
            const sql = 'CREATE TABLE IF NOT EXISTS USERS(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME VARCHAR, SURNAME VARCHAR, EMAIL VARCHAR, PASSWORD VARCHAR, TYPE VARCHAR)';
            this.#db.run(sql, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                //let value = 'USERS'
                resolve('USERS table created');
            });
        });*/
        console.log('newUserTable() CALLED')
    }

    newUser(user){

        //console.log(user.getUserAsDict());
        
        return new Promise((resolve, reject) => {

            let insert = true;

            // query to DB to check if tuple USERNAME-TYPE is already present
            const sql1 = 'SELECT * FROM USERS WHERE EMAIL = ? AND TYPE = ?';
            this.#db.getDB().all(sql1, [user.getEmail(), user.getType()], (err, rows) => {
                if(err){
                    // reports error while querying database
                    console.log('newUser() sql1.run error:: ', err);
                    reject(503);    // 503 Service Unavailable (generic error)
                    insert = false;
                    return;
                }
                //console.log(rows);
                // if tuples are found, new USER cannot be accepted
                if(rows.length != 0){
                    reject(409);    // 409 Conflict
                    insert = false;
                    return;
                }

                // query to DB to insert new USER
                const sql2 = 'INSERT INTO USERS(NAME, SURNAME, EMAIL, PASSWORD, TYPE) VALUES (?, ?, ?, ?, ?)';
                this.#db.getDB().run(sql2, [user.getName(), user.getSurname(), user.getEmail(), user.getPassword(), user.getType()], (err) => {
                    if (err) {
                        // reports error while querying database
                        console.log('newUser() sql2.run error:: ', err);
                        reject(503);    // 503 Service Unavailable (generic error)
                        return;
                    }
                    // USER added successfully
                    resolve(201);
                    return;
                });
            });
        });

    }

    getUser(data){
        return new Promise((resolve, reject) => {
            let sampleUser = {
                id: 1,
                username: 'dscre@ezwh.com',
                name: 'Simone',
                surname: 'Crescenzo',
                type: 'Manager'
            }

            // !!! session checking to be implemented !!!
            let logged = true;
            if(logged){
                // query to DB to retrieve USER info
                const sql = 'SELECT * FROM USERS WHERE EMAIL=?';
                this.#db.getDB().all(sql, [sampleUser.username], (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('getUser() sql.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                        return;
                    }
                    //console.log(rows);

                    if(rows.length == 0){
                        // 401 if username is not found in DB
                        reject(401);    // 401 Unauthorized
                        return;
                    } else {
                        // collects user data into a dictionary
                        const userData = rows.map((r) => (
                            {
                                id:r.ID,
                                username:r.EMAIL,
                                name:r.NAME,
                                surname:r.SURNAME,
                                type:r.TYPE
                            }
                        ));

                        resolve(userData);  // returrns userData dictionary to be sent as JSON response body
                        return;
                    }
                });
            } else {
                // if USER is not logged in, returns 401 Unauthorized
                reject(401);    // 401 Unauthorized
                return;
            }
        });
    }

    getSuppliers() {
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized){

                sql = 'SELECT * FROM USERS WHERE TYPE=\'manager\''
                sql.all(sql, (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('getUser() sql.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                        return;
                    }
                    //console.log(rows);

                    if(rows.length == 0){
                        // no supplier found in DB
                        resolve(rows);  // returns empty array
                        return;
                    } else {
                        // collects user data into a dictionary
                        const userData = rows.map((r) => (
                            {
                                id:r.ID,
                                username:r.EMAIL,
                                name:r.NAME,
                                surname:r.SURNAME,
                                type:r.TYPE
                            }
                        ));

                        resolve(userData);  // returrns userData dictionary to be sent as JSON response body
                        return;
                    }
                })

            } else {
                // if USER is not logged in or it is not a Manager, returns 401 Unauthorized
                reject(401);    // 401 Unauthorized
                return;
            }

        });
    }
}

module.exports = UserDAO;