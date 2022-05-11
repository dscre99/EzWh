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

                let sql = 'SELECT * FROM USERS WHERE TYPE=\'supplier\''
                this.#db.getDB().all(sql, (err, rows) => {
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
                        // collects suppliers data into a dictionary
                        const userData = rows.map((r) => (
                            {
                                id:r.ID,
                                username:r.EMAIL,
                                name:r.NAME,
                                surname:r.SURNAME
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

    getUsers() {
        return new Promise((resolve, reject) => {

            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                // query to DB to retrieve all users (except manager)
                let sql = 'SELECT * FROM USERS WHERE NOT (TYPE=\'manager\')';
                this.#db.getDB().all(sql, (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('getUser() sql.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                        return;
                    }
                    //console.log(rows);

                    // collects user data into a dictionary (except manager)
                    const users = rows.map((r) => (
                        {
                            id:r.ID,
                            name:r.NAME,
                            surname:r.SURNAME,
                            email:r.EMAIL,
                            type:r.TYPE
                        }
                    ));
                    //console.log(users);

                    resolve(users);
                    return;
                });
            } else {
                reject(401);    // 401 Unauthorized
                return;
            }
        });
    }

    newUser(user){

        //console.log(user.getUserAsDict());
        
        return new Promise((resolve, reject) => {

            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {
                // query to DB to check if tuple USERNAME-TYPE is already present
                const sql1 = 'SELECT * FROM USERS WHERE EMAIL = ? AND TYPE = ?';
                this.#db.getDB().all(sql1, [user.getEmail(), user.getType()], (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('newUser() sql1.run error:: ', err);
                        reject(503);    // 503 Service Unavailable (generic error)
                        return;
                    }
                    //console.log(rows);
                    // if tuples are found, new USER cannot be accepted
                    if(rows.length != 0){
                        reject(409);    // 409 Conflict
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
            } else {
                reject(401); // 401 Unauthorized
                return;
            }
        });

    }

    userSession(userData) {
        return new Promise((resolve, reject) => {

            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql = 'SELECT * FROM USERS WHERE EMAIL=? AND PASSWORD=? AND TYPE=?';
                this.#db.getDB().all(sql, [userData.username, userData.password, userData.type], (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('userSession() sql.all error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                        return;
                    } else if (rows.length == 0) {
                        // rejects session if no USER corresponding to data is found
                        reject(401);    // 401 Unauthorized
                        return;
                    } else {
                        // prepares response body (customer info: id, username, name)
                        const customerInfo = rows.map((r) => (
                            {
                                id:r.ID,
                                username:r.EMAIL,
                                name:r.NAME
                            }
                        ));
                        resolve(customerInfo);
                        return;
                    }
                });
            } else {
                reject(401);    // 401 Unauthorized
                return;
            }
        });
    }

    modifyUserType(newUserData) {
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT * FROM USERS WHERE EMAIL=? AND TYPE=?';
                this.#db.getDB().all(sql1, [newUserData.username, newUserData.oldType], (err, rows) => {
                    if(err){
                        // reports error while querying database
                        console.log('modifyUserType() sql1.all error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                        return;
                    } else if (rows.length == 0) {
                        // wrong username or oldType fields or user doesn't exists
                        reject(404);    // 404 Not Found
                        return;
                    } else {
                        let userID = rows.map((r) => r.ID);
                        userID = userID[0];
                        console.log(userID);

                        let sql2 = 'UPDATE USERS SET TYPE=? WHERE ID=?';
                        this.#db.getDB().all(sql2, [newUserData.newType, userID], (err, rows) => {
                            if(err){
                                // reports error while querying database
                                console.log('modifyUserType() sql2.all error:: ', err);
                                reject(500);    // 500 Internal Server Error (generic error)
                                return;
                            } else {
                                resolve(200);   // 200 OK
                                return;
                            }
                        });
                    }
                });

            } else {
                reject(401);    // 401 Unauthorized
                return
            }
        });
    }

    deleteUser(userData) {
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {
                let sql = 'DELETE FROM USERS WHERE EMAIL=? AND TYPE=?';
                this.#db.getDB().run(sql, [userData.username, userData.type], (err) => {
                    if(err){
                        // reports error while querying database
                        console.log('deleteUser() sql.all error:: ', err);
                        reject(503);    // 500 Service Unavailable (generic error)
                        return;
                    } else {
                        resolve(204);   // 204 No Content (success)
                        return;
                    }
                });
            } else {
                reject(401);    // 401 Unauthorized
                return;
            }
        });
    }

}

module.exports = UserDAO;