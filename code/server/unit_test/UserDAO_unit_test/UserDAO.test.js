//const EZWH_db = require('../../EZWH_db/EZWH_db');
const DB = require('../../EZWH_db/RunDB');
const DBinstance = DB.DBinstance;
const UserDAO = require('../../User/UserDAO');
const UserDAOinstance = new UserDAO(DBinstance);
//const DB = require('./mockDB')
//const UserDAOinstance = new UserDAO(DB);


function testSample(expectedString) {

    test('first testing attempt', () => {
        expect(UserDAOinstance.newUserTable()).toStrictEqual(expectedString);
    });
}

function testNewUser(username, name, surname, password, type, resExpected){

        test('new user', async () => {
            let user = {
                username:username,
                name:name,
                surname:surname,
                password:password,
                type:type
            }
            
            try {
                let res = await UserDAOinstance.newUser(user);
                expect(res).toEqual(resExpected);
            } catch (err) {
                expect(err).toEqual(resExpected);
            }
            
        });

}

function testGetUser(){

    test('get user', async () => {
        let res = await UserDAOinstance.getUser();
        expect(res).toEqual([{
            id: 1,
            username: 'dscre@ezwh.com',
            name: 'Simone',
            surname: 'Crescenzo',
            type: 'manager'
        }]);
    });
    
}

function testGetSuppliers(resExpected){

    test('get suppliers', async () => {
            let res = await UserDAOinstance.getSuppliers();
            expect(res).toEqual(resExpected);
    });

}

function testGetUsers(resExpected){

    test('get users', async () => {
        let res = await UserDAOinstance.getUsers();
        expect(res).toEqual(resExpected);
    });

}

function testUserSession(username, password, type, idExpected, nameExpected, errExpected){

    test('get users', async () => {

        let userData = {
            username:username,
            password:password,
            type:type
        }

        let resExpected = {
            id:idExpected,
            username:username,
            name:nameExpected
        }

        try {
            let res = await UserDAOinstance.userSession(userData);
            expect(res).toEqual(resExpected);
        } catch (err) {
            expect(err).toEqual(errExpected);
        }
    });

}

function testModifyUserType(username, oldType, newType, resExpected){

    test('get users', async () => {

        let userData = {
            username:username,
            oldType:oldType,
            newType:newType
        }

        try {
            let res = await UserDAOinstance.modifyUserType(userData);
            expect(res).toEqual(resExpected);
        } catch (err) {
            expect(err).toEqual(resExpected);
        }
    });

}

function testDeleteUser(username, type){

    test('get users', async () => {

        let userData = {
            username:username,
            type:type
        }

        let res = await UserDAOinstance.deleteUser(userData);
        expect(res).toEqual(204);
    });

}

describe('test UserDAO.js', () => {

    beforeAll(async () => {
        let res = await UserDAOinstance.clearUserTable();
        expect(res).toEqual(200);
    });


    // empty user array
    testGetUsers([]);

    // empty supplier array
    testGetSuppliers([]);
    

    // tests inserting new users, error code if duplicates are detected
    testNewUser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 201);
    testNewUser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 409);
    testNewUser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'customer', 201);
    testNewUser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'clerk', 201);
    testNewUser('qemp1@ezwh.com', 'Qual1', 'Emp1', 'testpassword', 'qualityEmployee', 201);
    testNewUser('demp1@ezwh.com', 'Deli1', 'Emp1', 'testpassword', 'deliveryEmployee', 201);
    testNewUser('supp1@ezwh.com', 'Hasit1', 'All1', 'testpassword', 'supplier', 201);

    // get user
    testGetUser();

    // all users besides manager array
    testGetUsers([
        {
            id:2,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'customer'
        },
        {
            id:3,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'clerk'
        },
        {
            id:4,
            name:'Qual1',
            surname:'Emp1',
            email:'qemp1@ezwh.com',
            type:'qualityEmployee'
        },
        {
            id:5,
            name:'Deli1',
            surname:'Emp1',
            email:'demp1@ezwh.com',
            type:'deliveryEmployee'
        },
        {
            id:6,
            name:'Hasit1',
            surname:'All1',
            email:'supp1@ezwh.com',
            type:'supplier'
        }
    ]);

    // one supplier array
    testGetSuppliers([
        {
            id:6,
            name:'Hasit1',
            surname:'All1',
            username:'supp1@ezwh.com'
        }
    ]);

    // multiple suppliers
    testNewUser('supp2@ezwh.com', 'Hasit2', 'All2', 'testpassword', 'supplier', 201);
    testNewUser('supp3@ezwh.com', 'Hasit3', 'All3', 'testpassword', 'supplier', 201);
    testGetSuppliers([
        {
            id:6,
            name:'Hasit1',
            surname:'All1',
            username:'supp1@ezwh.com'
        },
        {
            id:7,
            name:'Hasit2',
            surname:'All2',
            username:'supp2@ezwh.com'
        },
        {
            id:8,
            name:'Hasit3',
            surname:'All3',
            username:'supp3@ezwh.com'
        }
    ]);

    // manager session
    testUserSession('dscre@ezwh.com', 'testpassword', 'manager', 1, 'Simone');
    testUserSession('user1@ezwh.com', 'testpassword', 'customer', 2, 'John1');
    testUserSession('user1@ezwh.com', 'testpassword', 'clerk', 3, 'John1');
    testUserSession('supp2@ezwh.com', 'testpassword', 'supplier', 7, 'Hasit2');

    // manager session errors
    testUserSession('dscre@ezwh.com', 'wrongpassword', 'manager', 1, 'Simone', 401);
    testUserSession('notexisting@ezwh.com', 'testpassword', 'manager', 1, 'Simone', 401);
    testUserSession('dscre@ezwh.com', 'testpassword', 'unknown', 1, 'Simone', 401);

    // modify user type
    testModifyUserType('supp3@ezwh.com', 'supplier', 'customer', 200);

    // modify user type errors
    testModifyUserType('notexisting@ezwh.com', 'customer', 'supplier', 404);
    testModifyUserType('supp3@ezwh.com', 'supplier', 'customer', 404);  // not it is already customer

    // delete user
    testDeleteUser('user1@ezwh.com', 'clerk');
    testUserSession('user1@ezwh.com', 'testpassword', 'clerk', 3, 'John1', 401);
});
