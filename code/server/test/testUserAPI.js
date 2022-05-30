const { use } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

function testHelloWorldAPI() {
    // describe('mocha test', function() {
        it('getting hello world!', async function() {
            await agent.get('/api/hello').then(function(res) {
                res.should.have.status(200);
                res.body.message.should.equal('Hello world!');
            });
        });
    // });
}

function testDELETEclearusertable() {
    it('DELETE /api/clearusertable', async function() {
        await agent.delete('/api/clearusertable').then(function(res) {
            res.should.have.status(200);
        });
    });
}

function testGETuserinfo(id, username, name, surname, type, expectedHTTPstatus) {
    it('GET /api/userinfo', async function() {
        await agent.get('/api/userinfo').then(function(res) {
            res.should.have.status(expectedHTTPstatus);
            if(res.status == 200) {
                res.body[0].id.should.equal(id);
                res.body[0].username.should.equal(username);
                res.body[0].name.should.equal(name);
                res.body[0].surname.should.equal(surname);
                res.body[0].type.should.equal(type);
            }
        });
    });
}

function testGETsuppliers(expectedData, expectedHTTPstatus) {
    it('GET /api/suppliers', async function() {
        await agent.get('/api/suppliers')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].id.should.equal(expectedData[i].id);
                                res.body[i].name.should.equal(expectedData[i].name);
                                res.body[i].surname.should.equal(expectedData[i].surname);
                                res.body[i].email.should.equal(expectedData[i].email);
                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                        
                    });
    });
}

function testGETusers(expectedData, expectedHTTPstatus) {
    it('GET /api/users', async function() {
        await agent.get('/api/users')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            res.body.length.should.equal(expectedData.length);
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].id.should.equal(expectedData[i].id);
                                res.body[i].name.should.equal(expectedData[i].name);
                                res.body[i].surname.should.equal(expectedData[i].surname);
                                res.body[i].email.should.equal(expectedData[i].email);
                                res.body[i].type.should.equal(expectedData[i].type);
                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                    });
    });
}

function testPOSTnewuser(username, name, surname, password, type, expectedHTTPStatus) {
    it('testing POST /api/newuser', async function() {
        let user = { username:username, name:name, surname:surname, password:password, type:type };
        await agent.post('/api/newuser')
            .send(user)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testPOSTmanagerSessions(username, password, expectedData, expectedHTTPStatus) {
    it('testing POST /api/managerSessions', async function() {
        let manager = { username:username, password:password };
        await agent.post('/api/managerSessions')
            .send(manager)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
                if(expectedHTTPStatus == 200){
                    res.body.id.should.equal(expectedData.id);
                    res.body.username.should.equal(expectedData.username);
                    res.body.name.should.equal(expectedData.name);
                }
                
            });
    });
}

function testPOSTcustomerSessions(username, password, expectedData, expectedHTTPStatus) {
    it('testing POST /api/customerSessions', async function() {
        let manager = { username:username, password:password };
        await agent.post('/api/customerSessions')
            .send(manager)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
                if(expectedHTTPStatus == 200){
                    res.body.id.should.equal(expectedData.id);
                    res.body.username.should.equal(expectedData.username);
                    res.body.name.should.equal(expectedData.name);
                }
            });
    });
}

function testPOSTsupplierSessions(username, password, expectedData, expectedHTTPStatus) {
    it('testing POST /api/supplierSessions', async function() {
        let manager = { username:username, password:password };
        await agent.post('/api/supplierSessions')
            .send(manager)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
                if(expectedHTTPStatus == 200){
                    res.body.id.should.equal(expectedData.id);
                    res.body.username.should.equal(expectedData.username);
                    res.body.name.should.equal(expectedData.name);
                }
            });
    });
}

function testPOSTclerkSessions(username, password, expectedData, expectedHTTPStatus) {
    it('testing POST /api/clerkSessions', async function() {
        let manager = { username:username, password:password };
        await agent.post('/api/clerkSessions')
            .send(manager)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
                if(expectedHTTPStatus == 200){
                    res.body.id.should.equal(expectedData.id);
                    res.body.username.should.equal(expectedData.username);
                    res.body.name.should.equal(expectedData.name);
                }
            });
    });
}

function testPOSTqualityEmployeeSessions(username, password, expectedData, expectedHTTPStatus) {
    it('testing POST /api/qualityEmployeeSessions', async function() {
        let manager = { username:username, password:password };
        await agent.post('/api/qualityEmployeeSessions')
            .send(manager)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
                if(expectedHTTPStatus == 200){
                    res.body.id.should.equal(expectedData.id);
                    res.body.username.should.equal(expectedData.username);
                    res.body.name.should.equal(expectedData.name);
                }
            });
    });
}

function testPOSTdeliveryEmployeeSessions(username, password, expectedData, expectedHTTPStatus) {
    it('testing POST /api/deliveryEmployeeSessions', async function() {
        let manager = { username:username, password:password };
        await agent.post('/api/deliveryEmployeeSessions')
            .send(manager)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
                if(expectedHTTPStatus == 200){
                    res.body.id.should.equal(expectedData.id);
                    res.body.username.should.equal(expectedData.username);
                    res.body.name.should.equal(expectedData.name);
                }
            });
    });
}

function testPOSTlogout(expectedHTTPStatus) {
    it('testing POST /api/logout', async function() {
        await agent.post('/api/logout')
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testPUTusertype(username, typesData, expectedHTTPStatus) {
    it('testing PUT /api/users/:username', async function() {
        await agent.put('/api/users/'+username)
            .send(typesData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

function testDELETEuser(username, type, expectedHTTPStatus) {
    it('testing DELETE /api/users/:username/:type', async function() {
        await agent.delete('/api/users/'+username+'/'+type)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}






describe('test UserAPIreceiver.js', () => {

    // restores DB to a known state before start testing
    before(async () => {
        await agent.delete('/api/clearusertable');
    });

    testHelloWorldAPI();
    testGETuserinfo(1, 'dscre@ezwh.com', 'Simone', 'Crescenzo', 'manager', 401);

    // new User
        // test GETusers when none is present
        testGETusers([], 200);
    testPOSTnewuser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 201);
    testGETuserinfo(1, 'dscre@ezwh.com', 'Simone', 'Crescenzo', 'manager', 200);
        // duplicate conflict
    testPOSTnewuser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 409);   
        // empty fields
    testPOSTnewuser('', 'John1', 'Smith1', 'testpassword', 'customer', 422);
    testPOSTnewuser('user1@ezwh.com', '', 'Smith1', 'testpassword', 'customer', 422);
    testPOSTnewuser('user1@ezwh.com', 'John1', '', 'testpassword', 'customer', 422);
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', '', 'customer', 422);
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', '', 422);
        // wrong User type
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'ALIEN', 422);
        // short password
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'short', 'customer', 422);

        // add other users
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'customer', 201);
    testPOSTnewuser('user2@ezwh.com', 'John2', 'Smith2', 'testpassword', 'clerk', 201);
    testPOSTnewuser('qemp1@ezwh.com', 'Qual1', 'Emp1', 'testpassword', 'qualityEmployee', 201);
    testPOSTnewuser('demp1@ezwh.com', 'Deli1', 'Emp1', 'testpassword', 'deliveryEmployee', 201);
        // test suppliers when none is present
        testGETsuppliers([], 200);
    testPOSTnewuser('supp1@ezwh.com', 'Hasit1', 'All1', 'testpassword', 'supplier', 201);

    // get suppliers
    testGETsuppliers([
        {
            id:6,
            name:'Hasit1',
            surname:'All1',
            email:'supp1@ezwh.com'
        }
    ], 200);
    testPOSTnewuser('supp2@ezwh.com', 'Hasit2', 'All2', 'testpassword', 'supplier', 201);
    testGETsuppliers([
        {
            id:6,
            name:'Hasit1',
            surname:'All1',
            email:'supp1@ezwh.com'
        },
        {
            id:7,
            name:'Hasit2',
            surname:'All2',
            email:'supp2@ezwh.com'
        }
    ], 200);

    // get users (no managers)
    testGETusers([
        {
            id:2,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'customer'
        },
        {
            id:3,
            name:'John2',
            surname:'Smith2',
            email:'user2@ezwh.com',
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
        },
        {
            id:7,
            name:'Hasit2',
            surname:'All2',
            email:'supp2@ezwh.com',
            type:'supplier'
        }
    ], 200);

    // add check on return data structures
    testPOSTmanagerSessions('dscre@ezwh.com', 'testpassword', {id:1, username:'dscre@ezwh.com', name:'Simone'}, 200);
    testPOSTmanagerSessions('dscre@ezwh.com', 'wrongpassword', {}, 401);
    testPOSTcustomerSessions('user1@ezwh.com', 'testpassword', {id:2, username:'user1@ezwh.com', name:'John1'}, 200);
    testPOSTcustomerSessions('user1@ezwh.com', 'wrongpassword', {}, 401);
    testPOSTsupplierSessions('supp1@ezwh.com', 'testpassword', {id:6, username:'supp1@ezwh.com', name:'Hasit1'}, 200);
    testPOSTsupplierSessions('supp1@ezwh.com', 'wrongpassword', {}, 401);
    testPOSTclerkSessions('user2@ezwh.com', 'testpassword', {id:3, username:'user2@ezwh.com', name:'John2'}, 200);
    testPOSTclerkSessions('user2@ezwh.com', 'wrongpassword', {}, 401);
    testPOSTqualityEmployeeSessions('qemp1@ezwh.com', 'testpassword', {id:4, username:'qemp1@ezwh.com', name:'Qual1'}, 200);
    testPOSTclerkSessions('qemp1@ezwh.com', 'wrongpassword', {}, 401);
    testPOSTdeliveryEmployeeSessions('demp1@ezwh.com', 'testpassword', {id:5, username:'demp1@ezwh.com', name:'Deli1'}, 200);
    testPOSTclerkSessions('demp1@ezwh.com', 'wrongpassword', {}, 401);
    
    // logout
    testPOSTlogout(200);

    // change user type
    testPUTusertype('user1@ezwh.com', {oldType:'customer', newType:'clerk'}, 200);
    testPUTusertype('user1@ezwh.com', {oldType:'customer', newType:'clerk'}, 404);
     testPUTusertype('user1@ezwh.com', {oldType:'clerk', newType:'customer'}, 200);
     testPUTusertype('user1@ezwh.com', {oldType:'clerk', newType:'wrong'}, 422);
     testPUTusertype('user1@ezwh', {oldType:'wrong', newType:'customer'}, 422);

    // delete a user
    testPOSTnewuser('user3@ezwh.com', 'John3', 'Smith3', 'testpassword', 'customer', 201);
    testDELETEuser('user3@ezwh.com', 'customer', 204);

});

describe('test UC4-1 - Create user and define rights', () => {
    // restores DB to a known state before start testing
    before(async () => {
        await agent.delete('/api/clearusertable');
    });

    // inserts manager in DB
    testPOSTnewuser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 201);

    // creates user
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'customer', 201);

    // verify user is added correctly
    testGETusers([
        {
            id:2,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'customer'
        }
    ], 200);
});

describe('test UC4-2 - Modify user rights', () => {
    // restores DB to a known state before start testing
    before(async () => {
        await agent.delete('/api/clearusertable');
    });

    // -SCENARIO PREPARATION-

    // inserts manager in DB
    testPOSTnewuser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 201);

    // creates user
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'customer', 201);

    // verify user is added correctly
    testGETusers([
        {
            id:2,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'customer'
        }
    ], 200);

    // -ACTUAL SCENARIO TESTING-

    // change user type
    testPUTusertype('user1@ezwh.com', {oldType:'customer', newType:'clerk'}, 200);

    // verify user is modified correctly
    testGETusers([
        {
            id:2,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'clerk'
        }
    ], 200);
});

describe('test UC4-3 - Delete user', () => {
    // restores DB to a known state before start testing
    before(async () => {
        await agent.delete('/api/clearusertable');
    });

    // -SCENARIO PREPARATION-

    // inserts manager in DB
    testPOSTnewuser('dscre@ezwh.com', 'Simone', 'Crescenzo', 'testpassword', 'manager', 201);

    // creates user
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'customer', 201);

    // verify user is added correctly
    testGETusers([
        {
            id:2,
            name:'John1',
            surname:'Smith1',
            email:'user1@ezwh.com',
            type:'customer'
        }
    ], 200);

    // -ACTUAL SCENARIO TESTING-
    testDELETEuser('user1@ezwh.com', 'customer', 204);

    // verify user is deleted correctly
    testGETusers([], 200);
});