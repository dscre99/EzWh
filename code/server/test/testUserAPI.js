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




describe('test UserAPIreceiver.js', () => {

    // restores DB to a known state before start testing
    before(async () => {
        await agent.delete('/api/clearusertable');
    });

    testHelloWorldAPI();
    testGETuserinfo(1, 'dscre@ezwh.com', 'Simone', 'Crescenzo', 'manager', 401);

    // new User
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
    testPOSTnewuser('user1@ezwh.com', 'John1', 'Smith1', 'testpassword', 'clerk', 201);
    testPOSTnewuser('qemp1@ezwh.com', 'Qual1', 'Emp1', 'testpassword', 'qualityEmployee', 201);
    testPOSTnewuser('demp1@ezwh.com', 'Deli1', 'Emp1', 'testpassword', 'deliveryEmployee', 201);
    testPOSTnewuser('supp1@ezwh.com', 'Hasit1', 'All1', 'testpassword', 'supplier', 201);

});