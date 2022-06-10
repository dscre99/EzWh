const crypto = require('crypto');
const key = 'bibbidi_boobbidi_bu';
//const decipher = crypto.createDecipher('aes-256-cbc', key);

class UserDAO {
    #db = undefined;

    constructor(db) {
        this.#db = db;
    }

    clearUserTable(){
        return new Promise((resolve, reject) => {
            
            const sql1 = 'DROP TABLE IF EXISTS USERS';
            this.#db.run(sql1, (err) => {
                if(err){
                   // console.log('clearUserTable() error:', err);
                    reject(500);
                } else {

                    const sql2 = 'CREATE TABLE IF NOT EXISTS USERS(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME VARCHAR, SURNAME VARCHAR, EMAIL VARCHAR, PASSWORD VARCHAR, TYPE VARCHAR)';
                    this.#db.run(sql2, (err) => {
                        if(err){
                          //  console.log('clearUserTable() error:', err);
                            reject(500);
                        } else {
                            resolve(200);
                        }
                    });
                }
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
                type: 'manager'
            }

            // !!! session checking to be implemented !!!
            let logged = true;
            if(logged){
                // query to DB to retrieve USER info
                const sql = 'SELECT * FROM USERS WHERE EMAIL=?';
                this.#db.all(sql, [sampleUser.username], (err, rows) => {

                    if(err){
                        // reports error while querying database
                      //  console.log('getUser() sql.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                    } else {
                        //console.log(rows);

                        if(rows.length == 0){
                            // 401 if username is not found in DB
                            reject(401);    // 401 Unauthorized
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

                            resolve(userData);  // returns userData dictionary to be sent as JSON response body
                        }
                    }
                });
            } else {
                // if USER is not logged in, returns 401 Unauthorized
                reject(401);    // 401 Unauthorized
            }
        });
    }

    getSuppliers() {
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized){

                let sql = 'SELECT * FROM USERS WHERE TYPE=\'supplier\''
                this.#db.all(sql, (err, rows) => {
                    if(err){
                        // reports error while querying database
                       // console.log('getUser() sql.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                    } else {
                        //console.log(rows);

                        if(rows.length == 0){
                            // no supplier found in DB
                            resolve(rows);  // returns empty array
                        } else {
                            // collects suppliers data into a dictionary
                            const userData = rows.map((r) => (
                                {
                                    id:r.ID,
                                    name:r.NAME,
                                    surname:r.SURNAME,
                                    email:r.EMAIL
                                }
                            ));

                            resolve(userData);  // returrns userData dictionary to be sent as JSON response body
                        }
                    }
                });

            } else {
                // if USER is not logged in or it is not a Manager, returns 401 Unauthorized
                reject(401);    // 401 Unauthorized
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
                this.#db.all(sql, (err, rows) => {
                    if(err){
                        // reports error while querying database
                       // console.log('getUser() sql.run error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                    } else {
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
                    }
                });
            } else {
                reject(401);    // 401 Unauthorized
            }
        });
    }

    newUser(newUserData){
        
        return new Promise((resolve, reject) => {

            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {
                
                // query to DB to check if tuple USERNAME-TYPE is already present
                const sql1 = 'SELECT * FROM USERS WHERE EMAIL = ? AND TYPE = ?';
                this.#db.all(sql1, [newUserData.username, newUserData.type], (err, rows) => {
                    if(err){
                        // reports error while querying database
                       // console.log('newUser() sql1.run error:: ', err);
                        reject(503);    // 503 Service Unavailable (generic error)
                    } else {

                        // if tuples are found, new USER cannot be accepted
                        if(rows.length != 0){
                            reject(409);    // 409 Conflict
                        } else {
                            
                            // query to DB to insert new USER
                            const cipher = crypto.createCipher('aes-256-cbc', key);
                            let cipheredpw = cipher.update(newUserData.password, 'base64');
                            cipheredpw = cipher.final('base64');

                            const sql2 = 'INSERT INTO USERS(NAME, SURNAME, EMAIL, PASSWORD, TYPE) VALUES (?, ?, ?, ?, ?)';
                            this.#db.run(sql2, [newUserData.name, newUserData.surname, newUserData.username, cipheredpw, newUserData.type], (err) => {
                                if (err) {
                                    // reports error while querying database
                                   // console.log('newUser() sql2.run error:: ', err);
                                    reject(503);    // 503 Service Unavailable (generic error)
                                } else {
                                    // USER added successfully
                                    resolve(201);
                                }
                            });
                        }
                    }
                });
            } else {
                reject(401); // 401 Unauthorized
            }
        });

    }

    userSession(userData) {
        return new Promise((resolve, reject) => {

            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {
                
                const cipher = crypto.createCipher('aes-256-cbc', key);
                let cipheredpw = cipher.update(userData.password, 'base64');
                cipheredpw = cipher.final('base64');
                const sql = 'SELECT * FROM USERS WHERE EMAIL=? AND PASSWORD=? AND TYPE=?';
                this.#db.all(sql, [userData.username, cipheredpw, userData.type], (err, rows) => {
                    if(err){
                        // reports error while querying database
                       // console.log('userSession() sql.all error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                    } else if (rows.length == 0) {
                        // rejects session if no USER corresponding to data is found
                        reject(401);    // 401 Unauthorized
                    } else {
                        // prepares response body (customer info: id, username, name)
                        const userInfo = rows.map((r) => (
                            {
                                id:r.ID,
                                username:r.EMAIL,
                                name:r.NAME
                            }
                        ));

                        resolve(userInfo[0]);
                    }
                });
            } else {
                reject(401);    // 401 Unauthorized
            }
        });
    }

    modifyUserType(newUserData) {
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {

                let sql1 = 'SELECT * FROM USERS WHERE EMAIL=? AND TYPE=?';
                this.#db.all(sql1, [newUserData.username, newUserData.oldType], (err, rows) => {
                    if(err){
                        // reports error while querying database
                       // console.log('modifyUserType() sql1.all error:: ', err);
                        reject(500);    // 500 Internal Server Error (generic error)
                    } else if (rows.length == 0) {
                        // wrong username or oldType fields or user doesn't exists
                        reject(404);    // 404 Not Found
                    } else {
                        let userID = rows.map((r) => r.ID);
                        userID = userID[0];

                        let sql2 = 'UPDATE USERS SET TYPE=? WHERE ID=?';
                        this.#db.all(sql2, [newUserData.newType, userID], (err, rows) => {
                            if(err){
                                // reports error while querying database
                              //  console.log('modifyUserType() sql2.all error:: ', err);
                                reject(500);    // 500 Internal Server Error (generic error)
                            } else {
                                resolve(200);   // 200 OK
                            }
                        });
                    }
                });

            } else {
                reject(401);    // 401 Unauthorized
            }
        });
    }

    deleteUser(userData) {
        return new Promise((resolve, reject) => {
            // !!! session checking to be implemented !!!
            let loggedAndAuthorized = true;
            if(loggedAndAuthorized) {
                let sql = 'DELETE FROM USERS WHERE EMAIL=? AND TYPE=?';
                this.#db.run(sql, [userData.username, userData.type], (err) => {
                    if(err){
                        // reports error while querying database
                       // console.log('deleteUser() sql.all error:: ', err);
                        reject(503);    // 500 Service Unavailable (generic error)
                    } else {
                        resolve(204);   // 204 No Content (success)
                    }
                });
            } else {
                reject(401);    // 401 Unauthorized
            }
        });
    }

}

module.exports = UserDAO;